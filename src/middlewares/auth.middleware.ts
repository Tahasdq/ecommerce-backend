import type {Request,Response,NextFunction} from "express"
import tokenService from "../services/token.service.js";
import User from "../models/user.model.js";
import type { JwtPayload } from "jsonwebtoken";


export const requiresAuth = async (req:Request,res:Response,next:NextFunction) : Promise<void>=>{
  try{
    const token = req.cookies["customerToken"] || req.cookies["adminToken"]; 
    if (!token) {
      res.status(401).json({ message: "Not logged in" });
      return
    }
    const decoded =  await tokenService.verifyToken(token) as JwtPayload;
    
    const user = await User.findById(decoded["_id"]).select("-password");
    if (!user) {
       res.status(401).json({ message: "User not found" });
       return 
    }

    req.user = user;
    next();
  }catch(error){
    res.status(401).json({ message: "Invalid / expired token" });
  }
}
export const onlyAdmin = (req:Request,res:Response,next:NextFunction) :void=>{
  if(req.user.role!=="admin"){
    res.status(403).json({message:"Forbidden"})
    return
  }
  next()
}