import mongoose from "mongoose";
import crypto from "crypto";

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
      }, 
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      password: {
        type: String,
        required: true,
      },
      accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString("hex"),
      },
      currentlyPlaying: {
        type: String,
        trim: true,
        maxlength: 250
      },
      location: {
          type: String,
          maxlength: 100
      },
      post: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Posts"
          }
      ]
})

//following and followers

module.exports = mongoose.model('User', UserSchema)