const express = require('express');
const router = express.Router();
const { handleSignUp, handleSignIn, SignInView, SignUpView } = require('../controller/user') 

router.route('/signup').get(SignUpView).post(handleSignUp);
router.route('/signin').get(SignInView).post(handleSignIn);

module.exports = router;
