const express = require('express');
const router= express.Router();
const Controller = require('../Controller/User');

router.post('/Signup',Controller.signup);
router.post('/Login',Controller.login);

module.exports = router;



