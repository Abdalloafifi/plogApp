const mongoose = require('mongoose');
const joi = require('joi');

//category schema
const categorySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

// دالة التحقق باستخدام Joi
const vildateCategory = (data) => {
    const schema = joi.object({
        text: joi.string().min(1).required().trim().label("Title"),

    });
    return schema.validate(data);
}

const category = mongoose.model('category', categorySchema);
module.exports = { category, vildateCategory };
