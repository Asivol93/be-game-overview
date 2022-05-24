import express from "express";
import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";
import { PostSchema } from '../models/Post'
import { UserSchema } from '../models/User'


const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);


var passwordSchema = new PasswordValidator()

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export const SignUp = async (req, res) => {
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
}

export const SignIn = async (req, res) => {
    try {
        const {username, password, email, location, currentlyPlaying} = req.body
        const user = await User.findOne({username})

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                repsonse: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    location: user.location,
                    currentlyPlaying: user.currentlyPlaying
                },
                success: true
            })
        } else {
            res.status(404).json({
                response: "Username or password is incorrect, try again!",
                error: error,
                success: false
            })
        }
    } catch (error) {
        res.status(400).json({
            response: "Something went wrong!",
            success: false
        })
    }  
}


export const GetAllUsers = async (req,res) => {
    try {
        const allUsers = await User.find({})
        .populate("post")
        res.status(201).json({response: allUsers, success: true})
    } catch (error) {
        res.status(400).json({error: "No users found!", success: false})
    }
}

export const GetSingleUser = async (req,res) => {
    const { id } = req.params

    try {
        const singleUser = await User.findById(id, {username: 1, email: 1})
        .populate("post")
        if (singleUser) {
            res.status(201).json({ response: singleUser, success: true})
        } else {
            res.status(404).json({response: "User not found", success: false})
        }
    } catch (error) {
        res.status(400).json({error: error, success: false})
    }
}


export const EditUser = async (req,res) => {
    const updatedUserInfo = req.body
    const { id } = req.params

    try {
        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: updatedUserInfo},
            {new: true})
            if (updatedUser) {
                res.status(200).json({
                    response: updatedUser,
                    success: true
                })
            } else {
                res.status(400).json({
                    response: "User not found",
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

export const DeleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({
            response: deleteUser,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            response: error,
            success: false
        })
    }
}

export const NewUserFollowed = async (req, res) => {
    const { userId, myId } = req.params

    try {
        const newUserToFollow = await User.findById(userId, {
            username
        }).populate('user')

        if (newUserToFollow) {
            const clickedFollow = await User.findByIdAndUpdate(
                myId,
                {
                    $push: {following: newUserToFollow},
                },
                {
                    new: true,
                }
                ) 
                res.status(201).json({
                    response: clickedFollow,
                    success: true
                })
        } else {
            res.status(404).json({
                response: "Something went wrong..",
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

export const NewUserUnFollowed = async (req, res) => {
    const { userId, myId } = req.params

    try {
        const newUserToUnFollow = await User.findById(userId)

        if (newUserToUnFollow) {
            const clickedUnFollow = await User.findByIdAndUpdate(
                myId,
                {
                    $pullAll: {following: [newUserToUnFollow]},
                },
                {
                    new: true,
                }
                ) 
                res.status(201).json({
                    response: clickedUnFollow,
                    success: true
                })
        } else {
            res.status(404).json({
                response: "Something went wrong..",
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
