const mongoose=require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
     type:String,
      required:true,
      minlength:8,
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','User'],
        default:'User'
    }
    
},{collection:'Users'});
    const user=mongoose.model('Users',UserSchema);
    module.exports=user;