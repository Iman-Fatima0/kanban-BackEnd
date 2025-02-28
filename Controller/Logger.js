const dotenv=require('dotenv');
dotenv.config();
const Logger=require('../model/Loggermodel');

async function loggercreate(data)
{
    try{
    const logger = await Logger.create(data);
console.log("Logger created successfully",logger)   
 }
    catch(error)
    {
        console.error(error);
    }

}
async function allloggers(req,res)
{
    try{
    const loggers = await Logger.find().populate('User','name').populate('Task','name');
    return res.status(200).json({message:"All loggers", loggers});
    }
    catch(error)
    {
        console.error(error);
        return res.status(400).json({message:"error getting all loggers", error});
    }
}

module.exports =
{
    loggercreate,
    allloggers
 
}

