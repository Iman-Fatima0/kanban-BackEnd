const express = require('express');
const {authenticationtoken, authorization}=require('../Middleware/auth');

const Controller = require('../Controller/Logger');
const router= express.Router();
router.get('/allloggers',authenticationtoken,authorization('User','Admin'),Controller.allloggers);
module.exports = router;





