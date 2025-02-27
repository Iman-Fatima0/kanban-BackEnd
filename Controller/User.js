const jwt=require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const User= require('../model/Usermodel');

const signup = async(req,res)=>
    {
        try{
           const {name , email , password}=req.body;
           const existinguser= await User.findOne({email});
           if(existinguser)
           {
            return res.status(400).json({message:"Email already in use"});

           }
           const salt = await bcrypt.genSalt(10);
           const hashedpassword = await bcrypt.hash(password,salt);
            
           const  newUser = await User.create({name, email, password:hashedpassword});
           const payload={
            id:newUser._id,
            role:newUser.role
            };
           const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});
            res.status(200).json({message:"User successfully signup",token:token,user:newUser});

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
        const {email,password,role}=req.body;
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
            role:user.role};
        const token =jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"1h"});
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