import express from "express";
import { execMap } from "nodemon/lib/config/defaults";
const router = express.Router()
const Post = require('../models/Post')

router.get('/', (req,res) => {
    res.send('We are on posts')
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
        date
    } = req.body

    try {
        const newPost = await new Post({
            title,
            description,
            rating,
            date
        }).save()
        res.status(201).json({response: newPost, success: true})
    } catch (error) {
        res.status(400).json({response: error, success: false})
    }
})

module.exports = router