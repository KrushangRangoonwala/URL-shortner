const express = require('express');
const router = express.Router();
const { generateShourtURL, redirectTo ,handleView} = require('../controller/url') 

router.get('/url/:url',redirectTo);

// router.post('/',generateShourtURL);
router.route('/').post(generateShourtURL).get(handleView);

module.exports = router;
