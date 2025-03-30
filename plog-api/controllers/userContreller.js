const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const passwordComplexity = require("joi-password-complexity");
const { Post, } = require('../models/post');
const { comment, } = require('../models/comment');

const cloudinary = require('../config/cloudinary');
const xss = require('xss');



/**
 * @desc get all users profile
 * @route /api/users\/profile
 * @method GET
 * @access public (only admin)
 */

exports.getUsersProfile = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select("-password  -email");
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});
/**
 * @desc get  users profile
 * @route /api/users/profile/:id
 * @method GET
 * @access private 
 */


exports.getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
            .populate("posts");
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @desc update  user
 * @route /api/users\/update
 * @method put
 * @access private
 * */

exports.updateUser = asyncHandler(async (req, res) => {
    try {
        const data = {
            email: xss(req.body.email),
            password: xss(req.body.password)
        };
        const { error } = viledupdete(data);
        if (error) return res.status(400).json({ error: error.details[0].message });
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser && existingUser._id.toString() !== req.user.id) {
            return res.status(400).json({ error: 'This email is already in use' });
        }
        req.body.password = await bcrypt.hash(data.password, 10);
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { email: data.email, password: data.password } },
            { new: true } // إرجاع المستخدم المحدث
        ).select("-password -email");

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // generate jwt token
        const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //cookies token
        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        res.status(200).json({ message: "User logged in successfully" });


    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
});
function viledupdete(a) {
    const schema = joi.object({
        name: joi.string().min(3).max(30),
        email: joi.string().min(6).max(255).email().optional(),
        password: passwordComplexity().optional(),
    });
    return schema.validate(a);
}

/**
 * @desc profile  photo upload
 * @route /api/users/updatePhoto
 * @method post 
 * @access private (only logged in users)
 * */

exports.uploadUserPhoto = asyncHandler(async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const result = await cloudinary.uploader.upload_stream({ folder: "avatars" }, async (error, result) => {
            if (error) return res.status(500).json({ error: error.message });

            const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url }, { new: true });
            res.json( user );
            // console.log(user);
        });

        result.end(req.file.buffer); // إرسال الصورة إلى Cloudinary
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @desc delete  user 
 * @route /api/users/deleteUser
 * @method delete 
 * @access private
 * 
 * */

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // حذف الصورة من Cloudinary
        if (user.avatar) {
            // استخراج `public_id` من رابط الصورة
            const publicId = user.avatar.match(/\/([^\/]+?)(\.[^\/.]*)?$/)[1]
            await cloudinary.uploader.destroy(`avatars/${publicId}`);
        }

        // حذف المستخدم من قاعدة البيانات
        await User.findByIdAndDelete(req.user.id);

        // حذف المنشورات المرتبطة به المستخدم
        await Post.deleteMany({ user: req.user.id });
        //delete an image  posts

        // حذف التعليقات المرتبطة به المستخدم
        await comment.deleteMany({ user: req.user.id });

        res.json({ message: "User and all associated data deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

