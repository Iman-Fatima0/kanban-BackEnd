const express= require('express');
const app=express();
const bodyparser= require('body-parser');
const db= require('./db');

const UserRoutes=require('./Routes/UserRoutes');
const TaskRoutes=require('./Routes/TaskRoutes');
app.use(bodyparser.json());

app.use('/user',UserRoutes);
 app.use('/task',TaskRoutes);

const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);  
 });
