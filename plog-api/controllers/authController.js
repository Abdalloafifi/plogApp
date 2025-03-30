const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const passwordComplexity = require("joi-password-complexity");
const xss = require('xss');

// Register User
exports.register = asyncHandler(async (req, res) => {
    try {
        const data = {
            name: xss(req.body.name),
            email: xss(req.body.email),
            password: xss(req.body.password)
        };
        const { error } = viledRegister(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const newUser = new User({
            username: data.name,
            email: data.email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            // { expiresIn: '1h' }
        );

        // Set cookie with token (تأكد من استخدام maxAge بدلاً من expiresIn)
        res.cookie('token', token, {
            // maxAge: 60 * 60 * 1000, // ساعة واحدة
            httpOnly: true,
            secure: false, // استخدم false لو كنت على HTTP (على localhost)
            sameSite: 'lax'
        });

        res.status(201).json({
            message: "User registered successfully",
            username: data.name,
            id: newUser._id,
            avatar: newUser.avatar
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

function viledRegister(a) {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().min(6).max(255).email().required(),
        password: passwordComplexity().required(),
    });
    return schema.validate(a);
}

// Login User
exports.login = asyncHandler(async (req, res) => {
    try {
        const data = {
            email: xss(req.body.email),
            password: xss(req.body.password)
        };
        const { error } = viledLogin(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            // { expiresIn: '1h' }
        );

        // Set cookie with token
        res.cookie('token', token, {
            // maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        res.status(200).json({
            message: "User logged in successfully",
            token,
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            avatar: user.avatar
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

function viledLogin(a) {
    const schema = joi.object({
        email: joi.string().min(6).max(255).email().required(),
        password: passwordComplexity().required(),
    });
    return schema.validate(a);
}
exports.viledLogin=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.user.id).select("-password  -email");
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
})