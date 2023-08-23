//Server/routes/post.js
import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";
import "../models/post.js";

const routerPost = express.Router();
const Post = mongoose.model("Post");

routerPost.post("/createpost", requireLogin, async (req, res) => {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all fields" });
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    });
    try {
        const result = await post.save();
        res.json({ post: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post" });
    }
});


routerPost.get("/allpost", requireLogin, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate([{ path: "postedBy", strictPopulate: false }])
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", '_id name');
        res.json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});


routerPost.get('/mypost', requireLogin, async (req, res) => {
    try {
        const mypost = await Post.find({ postedBy: req.user._id })
            .populate([{ path: "postedBy", strictPopulate: false }])
            .populate("postedBy", "_id name");
        res.json({ mypost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user's posts" });
    }
});


routerPost.put('/like', requireLogin, async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        }).populate("postedBy", "_id name");

        if (!result) {
            return res.status(422).json({ error: "Failed to update the post." });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});


routerPost.put('/unlike', requireLogin, async (req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        }).populate("postedBy", "_id name");

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

routerPost.put('/comment', requireLogin, async (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    };

    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name")
        res.json(result);
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});


routerPost.delete('/deletepost/:postId', requireLogin, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId }).populate("postedBy", "_id");

        if (!post) {
            return res.status(422).json({ error: "Post not found" });
        }

        if (post.postedBy._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Not authorized to delete this post" });
        }

        await post.deleteOne();
        res.json({ message: "Deleted Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
})

export default routerPost;