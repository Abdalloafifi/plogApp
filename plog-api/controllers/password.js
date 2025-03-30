const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const nodemailer = require('nodemailer');
const passwordComplexity = require("joi-password-complexity");
const xss = require('xss');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// تحويل jwt.verify إلى نسخة تعتمد على الوعود
const verifyJwt = util.promisify(jwt.verify);
/**
 * دوال التحقق من صحة المدخلات
 */
function validateResetEmail(data) {
    const schema = joi.object({
        email: joi.string().email().required()
    });
    return schema.validate(data);
}

function validateResetPassword(data) {
    const schema = joi.object({
        password: passwordComplexity().required()
    });
    return schema.validate(data);
}
/**
 * إرسال بريد إعادة تعيين كلمة المرور
 */
exports.sendResetPasswordEmail = asyncHandler(async (req, res) => {
    const data = {
        email: xss(req.body.email)
    };
    const { error } = validateResetEmail(data);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
    const resetUrl = `http://localhost:3000/api/resetPassword/reset-password/${token}/${user._id}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,      // بريدك الإلكتروني
            pass: process.env.PASSWORD    // كلمة مرور تطبيق جوجل (App Password)
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Reset Password',
        text: `Please click the following link to reset your password: ${resetUrl}`
    };
    try {

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({ message: "Email sent successfully" });

        console.log(resetUrl);
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ error: "Failed to send email" });
    }
});
/**
 * إعادة تعيين كلمة المرور
 */
exports.resetPassword = asyncHandler(async (req, res) => {
    const data = {
        password: xss(req.body.password)
    };
    const { error } = validateResetPassword(data);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { token, id } = req.params;
    try {
        if (id != req.user.id) return res.status(401).json({ error: "Unauthorized access" });
        const decoded = await verifyJwt(token, process.env.JWT_SECRET);
        if (!decoded || decoded.id !== id) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        console.log("test1");
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const hashedPassword = await bcrypt.hash(data.password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Error during password reset:", err);
        res.status(500).json({ error: "Failed to reset password" });
    }
});
