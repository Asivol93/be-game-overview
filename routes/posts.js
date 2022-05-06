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

export const GetSinglePost = async (req, res) => {
    const {id} = req.params

    try {
        const singlePost = await Post.findById(id, {}).populate('user')
        if (singlePost) {
            res.status(200).json({
                response: singlePost, success: true,
            })
        } else {
            res.status(404).json({
                response: "Could not find the review",
                success: false
            })
        }
    } catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })
    }
}


export const CreatePost = async (req, res) => {
    const { id } = req.params
    const {
        title,
        description,
        genre, 
        rating,
        date,
        platforms,
        console,
        mobile,
        contentDelivery,
        visible,
        usefull,
        community,
        communityRating,
    } = req.body

    try {
        const newPost = await new Post({
            title,
            description,
            genre,
            rating,
            date,
            platforms,
            console,
            mobile,
            contentDelivery,
            visible,
            usefull,
            community,
            communityRating
        }).save()
        const updateUserWithPost = await User.findByIdAndUpdate(id, {
            $push: {post: newPost}
        })
        res.status(201).json({response: newPost, success: true})
    } catch (error) {
        res.status(400).json({response: error, success: false})
    }

}

