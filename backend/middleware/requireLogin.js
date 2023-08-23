import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "../models/user.js";

const User = mongoose.model("User");

export const requireLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "From Authtn: You must be logged in!" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, proces.env.SecretValues, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "From JWT: You must be logged in!" });
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        })
    })
}