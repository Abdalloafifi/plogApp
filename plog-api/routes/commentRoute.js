var express = require('express');
var router = express.Router();
const commentController = require("../controllers/commentController");
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin } = require('../middlewares/vEerfytoken');

router.post('/:id', verifyToken, commentController.createComment);
router.get('/:id/comments', verifyToken, commentController.getAllCommentsForPost);
router.delete("/:id/comments", verifyTokenAndAuthorize, commentController.deleteComment);
router.put("/comments/:id", verifyTokenAndAuthorize, commentController.updateComment);
router.put("/:id/like", verifyToken, commentController.likeComment);
router.put("/:id/unlike", verifyToken, commentController.unlikeComment);
router.get("/Allcomments", verifyTokenAndAdmin, commentController.getAllComments);

module.exports = router;
