var express = require('express');
var router = express.Router();
const category = require("../controllers/categoryController");

const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin, } = require('../middlewares/vEerfytoken');

router.post('/categoryadmin', verifyTokenAndAdmin, category.createCategory);
router.get('/all', verifyToken, category.getCategories);


module.exports = router;