var express = require('express');
var router = express.Router();
const controller = require("../controllers/userContreller");
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin, } = require('../middlewares/vEerfytoken');
const upload = require('../middlewares/upload');






router.get("/profile", verifyTokenAndAdmin, controller.getUsersProfile);

router.get("/profile/:id", verifyToken, controller.getUserProfile);

router.put("/update", verifyToken, controller.updateUser);
//update user photo
router.post('/upload-avatar', verifyToken, upload.single('image'), controller.uploadUserPhoto);
router.delete("/deleteUser/:id", verifyTokenAndAuthorize, controller.deleteUser);
module.exports = router;