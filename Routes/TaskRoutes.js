const express= require('express');
const router= express.Router();
const Controller = require('../Controller/Task');
const {authenticationtoken, authorization}=require('../Middleware/auth');

router.get('/display',authenticationtoken,authorization('User','Admin'),Controller.DisplayTask);
router.post('/add',authenticationtoken,authorization('User','Admin'),Controller.CreateTask);
router.put('/update/:id',authenticationtoken,authorization('User','Admin'),Controller.UpdateTask);
router.delete('/delete/:id',authenticationtoken,authorization('User','Admin'),Controller.DeleteTask);



module.exports=router;