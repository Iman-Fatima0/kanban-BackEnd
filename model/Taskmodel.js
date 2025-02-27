const mongoose = require('mongoose');

const taskSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
Description:{
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
        default:Date.now
    },

}, {collection:'Tasks'});
    const Task=mongoose.model('Tasks',taskSchema);
    module.exports=Task;