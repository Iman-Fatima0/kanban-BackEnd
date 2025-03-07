const mongoose = require('mongoose');
require("dotenv").config();
const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL);
const db=mongoose.connection;
db.on('connected',()=>
{
    console.log('Connected to MongoDB');
});
db.on('disconnected',()=>{
    console.log('disconnected from Mongodb');
})
db.on('error',()=>
{
console.log('Error connecting to mongoDB');
})

module.exports = db;