const express = require('express');
const router = express.Router();
const {LogUser, signUpUser} = require('../controllers/users.js');


router.post("/login", LogUser)
router.post("/signup", signUpUser)


module.exports = router;