import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

const routerUser = express.Router();
const Post = mongoose.model("Post");
const User = mongoose.model("User");

routerUser.get('/user/:id', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.findOne({ _id: req.params.id }).populate("postedBy", "_id");
        res.json({ user, posts });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

routerUser.put('/follow', requireLogin, async (req, res) => {
    try {
        // Update the follower
        let result = await User.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        });

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the following
        result = await User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).select("-password");

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result);

    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
});



routerUser.put('/unfollow', requireLogin, async (req, res) => {
    try {
        const result1 = await User.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.user._id }
        }, {
            new: true
        });

        const result2 = await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unfollowId }
        }, { new: true }).select("-password");

        res.json(result2);
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});


export default routerUser;