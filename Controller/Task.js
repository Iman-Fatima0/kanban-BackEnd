
const dotenv = require('dotenv');
dotenv.config();
const Task = require('../model/Taskmodel');
const { loggercreate } = require('../Controller/Logger');

const CreateTask = async (req, res) => {
    try {
        const taskData = req.body;

        console.log('Received task data:', taskData);

        // if (taskData._id) {
        //     const existingTask = await Task.findById(taskData._id);
        //     if (existingTask) {
        //         return res.status(400).json({ error: 'Task with this _id already exists' });
        //     }
        // }

        const newTask = new Task(taskData);
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const DeleteTask = async (req, res) => {
    try {
        const id = req.params.id;
    
        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }

        const taskdeleted = await Task.findByIdAndDelete({_id:id});
        const obj = {
            message: "Task deleted",
            status: 'deleted',
            Task: taskdeleted._id,
            createdAt: Date.now(),
            User: req.user.id,
        };
        loggercreate(obj);
        return res.status(200).json({ message: "task deleted sucessfully", taskdeleted });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error deleting task", error });
    }
};

const UpdateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if(!data)
        {
            return res.status(400).json({ message: "No data provided" });
        }
        const taskupdated = await Task.findByIdAndUpdate({ _id: id }, data, { new: true });
        const obj = {
            message: "Task updated",
            status: 'modified',
            Task: taskupdated._id,
            createdAt: Date.now(),
             User: req.user.id,
        };
         loggercreate(obj);
        return res.status(200).json({ message: "task updated successfully", taskupdated });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error updating task", error });
    }
};

const DisplayTask = async (req, res) => {
    try {
        const alltask = await Task.find();
        if(!alltask)
        {
            return res.status(400).json({ message: "No tasks found" });  
        }
        return res.status(200).json({ message: "tasks fetched successfully", alltask });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error fetching tasks", error });
    }
};

module.exports = {
    CreateTask,
    DeleteTask,
    UpdateTask,
    DisplayTask
};