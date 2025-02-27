const express= require('express');
const router= express.Router();
const Controller = require('../Controller/Task');
const {authenticationtoken, authorization}=require('../Middleware/auth');

router.get('/displayTask',authenticationtoken,authorization('User','Admin'),Controller.displaytask);
router.post('/addTask',authenticationtoken,authorization('User'),Controller.createTask);
router.put('/updateTask/:id',authenticationtoken,authorization('User'),Controller.updateTask);
router.delete('/deleteTask/:id',authenticationtoken,authorization('User'),Controller.deleteTask);

module.exports=router;