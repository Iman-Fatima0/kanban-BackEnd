const mongoose=require('mongoose')
const LoggerSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:['created', 'modified', 'deleted']
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Users'
     },
    Task:{ type:mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
     }
},{Collection:'Loggers'});

const Logger=mongoose.model('Loggers',LoggerSchema);
module.exports=Logger;