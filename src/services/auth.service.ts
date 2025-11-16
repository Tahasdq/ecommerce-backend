
import User from "../models/user.model.js"
import { createError, UserErrorResponse } from "../utils/error.js";
import tokenService from "./token.service.js";
import type { UserLogin, UserRegister } from "../types/user.types.js";



const registerUserService = async (data : UserRegister)=>{
    const {userName , email, password} = data
    const userFound  = await User.findOne({email})
    if(userFound) {  throw  createError(UserErrorResponse.userAreadyExist.message , 404 , UserErrorResponse.userAreadyExist.code);}
    const user = (await User.create({userName , email,password}))
    const {password: _password , ...restUser} = user.toObject() // we are destructing and renaming password so it dont give redeclaring error just 
    return restUser
}

const loginUser = async (data:UserLogin)=>{
    const {email, password} = data
    const userFound  = await User.findOne({email ,password})

    if(!userFound) {  throw  createError(UserErrorResponse.invalidCredentials.message, 401,UserErrorResponse.invalidCredentials.code);}

    const userToken = await tokenService.generateToken(userFound) //generating otp token
    if(!userToken) {throw new Error }

    const {_id} = userFound.toObject()
    return {userId: _id , userToken}
}

export  {registerUserService , loginUser}
export default {registerUserService , loginUser}