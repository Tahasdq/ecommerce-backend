
import User from "../models/user.model.js"
import { createError, UserErrorResponse } from "../utils/error.js";
import tokenService from "./token.service.js";
import type { UserLogin, UserRegister } from "../types/user.types.js";
import { sendEmail } from "../utils/sendEmail.js";
import { TOKEN_EXPIRY } from "../utils/tokenConstant.js";



const registerUserService = async (data : UserRegister)=>{
    const {userName , email, password} = data
    const userFound  = await User.findOne({email})
    if(userFound?.isEmailVerified) {
          throw  createError(UserErrorResponse.emailAlreadyVerified.message , 404 , UserErrorResponse.emailAlreadyVerified.code);
    }
    
    if(userFound) {  throw  createError(UserErrorResponse.userAreadyExist.message , 404 , UserErrorResponse.userAreadyExist.code);}
    const user = (await User.create({userName , email,password}))
    const verificationToken = await tokenService.generateToken(user._id ,TOKEN_EXPIRY.EMAIL_VERIFY )
    user.emailVerificationToken = verificationToken
    await user.save()
    const verificationLink = `${process.env["BACKEND_URL"]}${process.env["PORT"]}/api/auth/verify-email-link?token=${verificationToken}&userId=${user._id}`
    await sendEmail(email , verificationLink)
    const {password: _password , ...restUser} = user.toObject() // we are destructing and renaming password so it dont give redeclaring error just 
    return restUser
}

const loginUser = async (data:UserLogin)=>{
    const {email, password,requestFor} = data
    const userFound  = await User.findOne({email ,password}).select("+password")
    if(!userFound) {  throw  createError(UserErrorResponse.invalidCredentials.message, 401,UserErrorResponse.invalidCredentials.code);}
    if(!userFound?.isEmailVerified){
        throw  createError("Email is not verified", 401,"Email not verified")
    }
    
    if(requestFor=="admin" && userFound.role!=="admin"){
      {  throw  createError(UserErrorResponse.invalidCredentials.message, 401,UserErrorResponse.invalidCredentials.code);} 
    }

    const userToken = await tokenService.generateToken(userFound , TOKEN_EXPIRY.LOGIN) //generating otp token
    if(!userToken) {throw new Error }

    const {_id,role} = userFound.toObject()
    return {userId: _id ,role:role, userToken}
}

export  {registerUserService , loginUser}
export default {registerUserService , loginUser}