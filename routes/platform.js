import express from "express";
import mongoose from "mongoose";
import { PostSchema } from '../models/Post'

const Post = mongoose.model("Post", PostSchema);

export const FindGameByQuery = async (req, res) => {
    const { searchParams } = req.params

    const rating = searchParams.rating
    const genre = searchParams.genre


    try {
        const games = await Post.find({ $or: searchParams.map((param) => {param.rating})
        //   {rating: rating}, {genre: genre}, {console: searchValue}  
        
            
         
            // platforms: new RegExp(platforms, "i"), 
            // title: new RegExp(title, "i"), 
            // description: new RegExp(description, "i"), 
            // genre: new RegExp(genre, "i"), 
            // console: new RegExp(console, "i"), 
            // mobile: new RegExp(mobile, "i"), 
            // contentDelivery: new RegExp(contentDelivery, "i") 
        })
        // return games
        res.status(200).json({
            response: games,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })
    }
}

// , title, description, genre, console, mobile, contentDelivery