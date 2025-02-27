const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const authenticationtoken=(req,res,next)=>
{
    const header=req.headers.authorization;
    // console.log("header",header,req.headers)
    const token=header.split('')[1];
    try{
    if(token==null)
    {
        return res.status(404).json({message:'No token provided'});
    }
    const verified=jwt.verify(token,process.env.JWT_SECRET);
    console.log(token);
    req.user=verified;
    req.status(202).json({message:"User verified"});
    next();
    }
    catch(error){
        console.log("invalid token",error);
        res.status(403).json({error:"invalid token"});

    }
}
function authorization(...allowedRoles)
{
    return(req,res,next)=>
    {
        console.log("authorization",allowedRoles);
        if(!allowedRoles.includes(req.user.role))
        {
            return res.status(403).json({message:"Unauthorized access"});;
        }
        next();
    }
}
module.exports = {authenticationtoken, authorization}