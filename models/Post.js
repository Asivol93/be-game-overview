import mongoose from "mongoose";

export const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 800,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["FPS", "RTS", "RPG", "MMORPG", "MOBA", "Stealth", "Fighting", "Survival", "Survival Horror", "Text Games", "Strategy", "Tower Defence", "Simulation", "Party", "Trivia", "Logic and Puzzle", "Board games", "Sport", "Platformer", "Educational", "Exercise"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5,6,7,8,9,10]
    },
    platforms: {
        type: String,
        required: true,
        enum: ["Console", "Mobile", "PC"]
    },
    console: [{
        type: String,
        enum: ["Nintendo 64", "Nintendo GameCube", "Nintendo Gameboy Player", "Nintento Wii", "Nintendo Wii U", "Nintendo Switch", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Xbox", "Xbox 360", "Xbox One", "Xbox Series X / S", "GamePop", "GameStick", "Steam Box", "Steam Deck", "Ouya", "Sega Firecore", "Atari Flashback 2", "Atari Flashback 3", "Atari Flashback 4"]
    }],
    mobile: [{
        type: String,
        enum: ["Apple iOS", "Android OS", "Windows Mobile OS", "WebOS", "Harmony OS", "Bada"]
    }],
    contentDelivery: {
        type: String,
        enum: ["Steam", "Origin", "Battle.net", "Uplay", "GOG", "Roblox", "Epic Games", "PlayStation Network", "PlayStation Store", "Microsoft Store", "Nintendo eShop", "Amazon Appstore", "Samsung Galaxy Store", "Huawei AppGallery", "Google Play Store", "Apple App Store", "Metaboli", "Ubisoft Connect", "GameHouse", "Game Jolt", "Green Man Gaming", "GamersGate", "Amazon Prime Gaming", "Amazon App Store", "Humble Store", "itchi.io", "Mac Desktop Store", "Riot Games"     ]
    },
    visible: {
        type: Boolean,
        required: true,
    },
    usefull: {
        type: Number,
        default: 0
    },
    community: {
        type: String,
        maxlength: 150,
        minlength: 5,
        trim: true
    },
    communityRating: {
        type: Number,
        enum: [1,2,3,4,5,6,7,8,9,10]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

