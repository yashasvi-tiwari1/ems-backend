import jsonwebtoken from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";

const TokenValidation =  (req:Request,res:Response,next:NextFunction) =>{
    try {

    const token: any = req.headers.authorization;
    console.log(token);
    let realtoken = token.slice(7);
    console.log(realtoken);
    const decoded = jsonwebtoken.verify(realtoken, `${process.env.ACCESS_TOKEN_SECRET}`);
    const string = JSON.stringify(decoded);
    const decode = JSON.parse(`${string}`);
    console.log(decode);
    if(decode.role === 'admin' || decode.role === 'staff'){
        next();
    }
    else {
        res.send('you are not elligible to perform this task');
    }
    }
    catch (err){
        res.sendStatus(401).send(err);
    }
}

export default TokenValidation