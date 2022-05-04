import express from "express";
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req,res) => {
    try {
        const getAllPosts = await Post.find({})
        .sort({date: "desc"})
        .populate("user", {
            username: 1
        })
        res.status(201).json({response: getAllPosts, success: true})
    } catch (error) {
        res.status(400).json({error: "No posts found!", success: false})
    }
})

router.get('/specific', (req,res) => {
    res.send('Specific post')
})

router.post('/', async (req, res) => {
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
        const updateUserWithPost = await User.findByIdAndUpdate(id, {
            $push: {post: newPost}
        })
        res.status(201).json({response: newPost, success: true})
    } catch (error) {
        res.status(400).json({response: error, success: false})
    }
})

module.exports = router