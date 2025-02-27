const mongoose = require('mongoose');
const mongoURL= 'mongodb://localhost:27017/Kanban';
// Connect to MongoDB
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