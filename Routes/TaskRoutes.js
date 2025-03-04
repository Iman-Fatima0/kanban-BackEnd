const express= require('express');
const router= express.Router();
const Controller = require('../Controller/Task');
const {authenticationtoken, authorization}=require('../Middleware/auth');

router.get('/display',authenticationtoken,authorization('User','Admin'),Controller.displaytask);
router.post('/add',authenticationtoken,authorization('User','Admin'),Controller.createTask);
router.put('/update/:id',authenticationtoken,authorization('User','Admin'),Controller.updateTask);
router.delete('/delete/:id',authenticationtoken,authorization('User','Admin'),Controller.deleteTask);



module.exports=router;