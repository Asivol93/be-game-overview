import { generateKeySync } from "crypto";
import express from "express";
import mongoose from "mongoose";
import { PostSchema } from '../models/Post'

const Post = mongoose.model("Post", PostSchema);

export const FindGameByGenre = async (req, res) => {
    const { genre } = req.params

    try {
        const gamesByGenre = await Post.find({genre: genre})
        .sort({date: "desc"})
        .populate("user", {
            username: 1
        })
        res.status(200).json({
            response: gamesByGenre,
            success: true
        })
        
    }catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })

}
}

//funkar ej pga rating är nummer
export const FindGameByRating = async (req, res) => {
    const { rating } = req.params

    try {
        const gamesByRating = await Post.find({rating: rating})
        .sort({date: "desc"})
        .populate("user", {
            username: 1
        })
        res.status(200).json({
            response: gamesByRating,
            success: true
        })
        
    }catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })

}
}

export const FindGameByPlatform = async (req, res) => {
    const { platforms } = req.params

    try {
        const gamesByPlatform = await Post.find({platforms: platforms})
        .sort({date: "desc"})
        .populate("user", {
            username: 1
        })
        res.status(200).json({
            response: gamesByPlatform,
            success: true
        })
        
    }catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })

}
}

export const FindGameByContentDelivery = async (req, res) => {
    const { contentDelivery } = req.params

    try {
        const gamesByContentDelivery = await Post.find({contentDelivery: contentDelivery})
        .sort({date: "desc"})
        .populate("user", {
            username: 1
        })
        res.status(200).json({
            response: gamesByContentDelivery,
            success: true
        })
        
    }catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })

}
}

// , title, description, genre, console, mobile, contentDelivery