const joi = require('joi');
const mongoose = require('mongoose');
const path = require('path');

const schemaUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // تحقق من تنسيق البريد الإلكتروني
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
    },

    bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
},

);
schemaUser.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "user"
}),



    module.exports = mongoose.model('User', schemaUser);