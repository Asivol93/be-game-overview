import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    platforms: {
        type: String,
        required: true,
        enum: ["Nintendo 64", "Nintendo GameCube", "Nintendo Gameboy Player", "Nintento Wii", "Nintendo Wii U", "Nintendo Switch", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Xbox", "Xbox 360", "Xbox One", "Xbox Series X / S", "GamePop", "GameStick", "Steam Box", "Steam Deck", "Ouya", "Sega Firecore", "Atari Flashback 2", "Atari Flashback 3", "Atari Flashback 4",  ]
    },
    contentDelivery: {
        type: String,
        required: false,
        enum: ["Steam", "Origin", "Battle.net", "Uplay", "GOG", "Roblox", "Epic Games", "PlayStation Network", "PlayStation Store", "Microsoft Store", "Nintendo eShop", "Amazon Appstore", "Samsung Galaxy Store", "Huawei AppGallery", "Google Play Store", "Apple App Store", "Metaboli", "Ubisoft Connect", "GameHouse", "Game Jolt"    ]
    }
})

module.exports = mongoose.model('Posts', PostSchema)