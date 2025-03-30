const { category, vildateCategory } = require('../models/category');
const asyncHandler = require('express-async-handler');
const xss = require("xss");

/**
 * @desc create new category
 * @route /api/categories
 * @method Post
 * @access public
 */

exports.createCategory = asyncHandler(async (req, res) => {
    try {
        const data = {
            text: xss(req.body.text),

        }
        const { error } = vildateCategory(data);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const newCategory = new category({
            text: data.text,
            user : req.user.id
        });
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @desc get all categories
 * @route /api/categories/all
 * @method get
 * @access public
 */

exports.getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});