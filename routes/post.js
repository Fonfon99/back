const express = require('express');
const multer = require('../middleware/multer');
const router = express.Router();
const {getPosts, createPost, createComment, deletePost, likeOrUnlike, getLike} = require('../controllers/posts.js');
const {checkToken} = require('../middleware/token.js');

router.use(checkToken);

router.get("/", getPosts)
router.post("/", multer, createPost)
router.delete("/:id", deletePost)
router.post("/:id/comments", createComment)
router.post("/:id/like", likeOrUnlike)
router.get("/:id/like", getLike)

module.exports = router;