const jwt=require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const Task= require('../model/Taskmodel');
const createTask = async(req,res)=>
{
    try
    {
    const data= req.body;
    const taskcreated= await Task.create(data);
    return res.status(200).json({message:"user sucessfully created task",taskcreated});
      
    }
    catch(error)
    {
      console.log(error);
      return res.status(400).json({message:"error creating task", error});
    }
}
const deleteTask = async(req,res)=>
{
    try{
        const id= req.params.id;
        if(!id)
        {
            return res.status(400).json({message:"id is required"});

        }
       
        const taskdeleted= await Task.findByIdAndDelete(id);
        return res.status(200).json({message:"user sucessfully deleted task",taskdeleted});

    }
    catch(error){
    console.log(error);
    return res.status(400).json({message:"error deleting task", error});
    }
}
const updateTask = async(req,res)=>
{
    try{
        const id = req.params.id;
        const data=req.body;
        const taskupdated= await Task.findByIdAndUpdate({_id:id},data,{new:true});
        return res.status(200).json({message:"user sucessfully updated task",taskupdated});

    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({message:"error updating task", error});

    }
}
const displaytask=async(req,res)=>
{
    try{
        const alltask= await Task.find();
        return res.status(200).json({message:"user sucessfully fetched tasks",alltask});
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({message:"error fetching tasks", error});
    }
}
module.exports={
    createTask,
    deleteTask,
    updateTask,
    displaytask
 
}