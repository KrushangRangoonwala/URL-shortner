const express = require('express');
const router = express.Router();
const { handleSignUp, handleSignIn } = require('../controller/user') 


router.post('/signup',handleSignUp);

router.post('/signin',handleSignIn);

module.exports = router;
