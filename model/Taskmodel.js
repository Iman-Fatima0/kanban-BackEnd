const mongoose = require('mongoose');

const taskSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
status:{
        type:String,
        enum:['To Do','In Progress','Done'],
        default:'To Do'
    },
  priority:{
    type:String,
    enum:['Low','Medium','High'],
    default:'Low'

    },
    dueDate:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },


}, {collection:'Tasks'});
    const Task=mongoose.model('Tasks',taskSchema);
    module.exports=Task;