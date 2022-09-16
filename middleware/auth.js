import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
const auth=(req,res,next)=>{
    const token=req.header('x-auth-token') //401 - access denied
    if(!token) res.status(401).send("Access Denied .No Token Provided")
    try{
        const decode=jwt.verify(token,process.env.SECRETKEY)
        req.user=decode
        next()
    }catch(error){
        res.status(400).send('invalid Token')
    }
}
export default auth