const express= require('express');
const app=express();
const bodyparser= require('body-parser');
const db= require('./db');
const cookieparser= require('cookie-parser');

app.use(cookieparser());
app.use(bodyparser.json());

const UserRoutes=require('./Routes/UserRoutes');
const TaskRoutes=require('./Routes/TaskRoutes');
const LoggerRoutes=require('./Routes/LoggerRoutes');




app.use('/user',UserRoutes);
 app.use('/task',TaskRoutes);
 app.use('/logger',LoggerRoutes);

const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);  
 });
