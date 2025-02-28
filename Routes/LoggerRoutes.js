const express = require('express');

const Controller = require('../Controller/Logger');
const router= express.Router();
router.get('/allloggers',Controller.allloggers);
module.exports = router;





