const express = require('express');
const router = express.Router();
const { handleSignUp, handleSignIn, SignInView, SignUpView } = require('../controller/user') 

router.route('/signup').post(handleSignUp).get(SignUpView);
router.route('/signin').post(handleSignIn).get(SignInView);

module.exports = router;
