import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";
const router = express.Router()
const User = require('../models/User')

var passwordSchema = new PasswordValidator()

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

router.post('/signup', async (req, res) => {
    const {
        username,
        password,
        email,
        location,
        currentlyPlaying
    } = req.body

    try {
        const salt = bcrypt.genSaltSync()

        if (passwordSchema.validate(password)) {
            const newUser = await new User({
                username,
                password: bcrypt.hashSync(password, salt),
                email,
                location,
                currentlyPlaying
            }).save()

            res.status(201).json({
                response: {
                    id: newUser._id,
                    username: newUser.username,
                    accessToken: newUser.accessToken,
                    email: newUser.email,
                    location: newUser.location,
                    currentlyPlaying: newUser.currentlyPlaying,
                },
                success: true
            })
        }
    } catch (error) {
        if (error.code === 1100) {
            res.status(400).json({
                response: "Username is taken...",
                error: error,
                success: false
            })
        } else {
            res.status(400).json({
                response: "Something went wrong!",
                error: error,
                success: false
            })
        }
    }
})


router.get('/', (req,res) => {
    res.send('Users!')
})

router.get('/userprofile/:id', async (req,res) => {
    const { id } = req.params

    try {
        const getSingleUser = await User.findById(id, {username: 1, email: 1})
        .populate("post")
        if (getSingleUser) {
            res.status(201).json({ response: getSingleUser, success: true})
        } else {
            res.status(404).json({response: "User not found", success: false})
        }
    } catch (error) {
        res.status(400).json({error: error, success: false})
    }
})



module.exports = router