import express from "express";
import mongoose from "mongoose";
import { PostSchema } from '../models/Post'
import { UserSchema } from '../models/User'

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

export const GetAllPosts = async (req,res) => {
    try {
        const allPosts = await Post.find({})
        .sort({date: "desc"})
        .populate("user", {
            username: 1
        })
        res.status(201).json({response: allPosts, success: true})
    } catch (error) {
        res.status(400).json({error: "No posts found!", success: false})
    }
}

// router.get('/specific', (req,res) => {
//     res.send('Specific post')
// })


export const CreatePost = async (req, res) => {
    const { id } = req.params
    const {
        title,
        description, 
        rating,
        date,
        platforms,
        console,
        mobile,
        contentDelivery,
        visible,
        usefull,
    } = req.body

    try {
        const newPost = await new Post({
            title,
            description,
            rating,
            date,
            platforms,
            console,
            mobile,
            contentDelivery,
            visible,
            usefull,
        }).save()
        // const updateUserWithPost = await User.findByIdAndUpdate(id, {
        //     $push: {post: newPost}
        // })
        res.status(201).json({response: newPost, success: true})
    } catch (error) {
        res.status(400).json({response: error, success: false})
    }

}

