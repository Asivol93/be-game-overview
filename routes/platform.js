import express from "express";
import mongoose from "mongoose";
import { PostSchema } from '../models/Post'

const Post = mongoose.model("Post", PostSchema);

export const FindGameByQuery = async (req, res) => {
    const { platforms, title, description, genre, console, mobile, contentDelivery } = req.query

    try {
        const findGameByQuery = await Post.find({
            platforms: new RegExp(platforms, "i"), 
            title: new RegExp(title, "i"), 
            description: new RegExp(description, "i"), 
            genre: new RegExp(genre, "i"), 
            console: new RegExp(console, "i"), 
            mobile: new RegExp(mobile, "i"), 
            contentDelivery: new RegExp(contentDelivery, "i") 
        })
        res.status(200).json({
            response: findGameByQuery,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })
    }
}