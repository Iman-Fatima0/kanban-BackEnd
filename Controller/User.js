const jwt=require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const dotenv=require('dotenv');
dotenv.config();


const User= require('../model/Usermodel');

const signup = async(req,res)=>
    {
        try{
           const {name ,role, email , password}=req.body;
           const existinguser= await User.findOne({email});
           if(existinguser)
           {
            return res.status(400).json({message:"Email already in use"});

           }
           if(!role ||  !email  ||  !password)
           {
            return res.status(400).json({message:"All fields are required"});
           }
           const salt = await bcrypt.genSalt(10);
           const hashedpassword = await bcrypt.hash(password,salt);
           const  newUser = await User.create({ role, name, email, password:hashedpassword});
           const payload={
            id:newUser._id,
            role:newUser.role
            };
           const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});
           res.cookie("SubwayCookie",token,{expiresIn:"3h"});
            res.status(200).json({message:"SignUp sucessfull",token:token,user:newUser});
        }

        catch(error)
        {
            console.error(error);
            res.status(500).json({message:"Internal Server error"});
        }
    }
    
const login = async(req,res)=>
{
    try{
        const {email,password}=req.body;
        if(!email  || !password)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        const user= await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }
           
        const isPaswordValid= await bcrypt.compare(password,user.password);
        if(!isPaswordValid)
        {
            return res.status(404).json({message:"Invalid password"});
        }

        const userData = {id:user._id,
            role:user.role,
            name:user.name,
            email:user.email,
            password:user.password,
        };
        const token =jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie("SubwayCookie",token,{expiresIn:"3h"});
        res.json({message:"Login Sucessfully",token:token});


       
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({message:"Internal Server error"});

    }


}
module.exports={
    login,
    signup
}