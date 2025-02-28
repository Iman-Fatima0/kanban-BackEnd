const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const authenticationtoken=(req,res,next)=>
{
    try{
    const token=req.cookies.SubwayCookie;
    console.log("token",token);
   
    if(token==null)
    {
        return res.status(404).json({message:'No token provided'});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
    console.log(token);
    if (err) throw err;
    req.user=data;
    next();
    });
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