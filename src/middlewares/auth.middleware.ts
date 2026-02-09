import type {Request,Response,NextFunction} from "express"
import tokenService from "../services/token.service.js";
import User from "../models/user.model.js";


export const requiresAuth = async (req:Request,res:Response,next:NextFunction) : Promise<void>=>{
  try{
    const token = req.cookies.customerToken; 
    if (!token) {
      res.status(401).json({ message: "Not logged in" });
      return
    }
    const decoded =  await tokenService.verifyToken(token);

    const user = await User.findById(decoded._id).select("-password");
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