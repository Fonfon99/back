const express = require('express');
const router = express.Router();
const {getPosts} = require('../controllers/posts.js');
const {checkToken} = require('../middleware/token.js');

router.get("/posts", checkToken, getPosts)

module.exports = router;