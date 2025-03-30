var express = require('express');
var router = express.Router();
const controller = require("../controllers/authController");
const { verifyToken, verifyTokenAndAuthorize ,verifyTokenAndAdmin, }= require('../middlewares/vEerfytoken');


router.post ("/register", controller.register);

router.post ("/login", controller.login);

router.get("/viledLogin", verifyToken, controller.viledLogin);



module.exports = router;
