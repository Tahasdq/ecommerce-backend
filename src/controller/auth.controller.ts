import type { Request, Response } from "express";
import AuthService from "../services/auth.service.js";
import { apiResponse } from "../utils/apiHelper.js";
import { UserSuccessResponse } from "../utils/sucess.js";
import { commonErrorResponse } from "../utils/error.js";
import tokenService from "../services/token.service.js"
import User from "../models/user.model.js";
import { TOKEN_EXPIRY } from "../utils/tokenConstant.js";
import { sendEmail } from "../utils/sendEmail.js";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const result = await AuthService.registerUserService({
      userName,
      email,
      password,
    });
    
    return res.status(200).json(apiResponse({
      success: true,
      message: UserSuccessResponse.userRegisteredSuccessfully.message,
      data:result,
      code: UserSuccessResponse.userRegisteredSuccessfully.code
    }));
  } catch (error: any) {
    if (error.code && error.statusCode && error.message) {
    return  res
        .status(error.statusCode)
        .json(apiResponse({
          success: false,
          message: error.message,
          data: null,
          code: error.code,
        }));
    }
    return res
      .status(500)
      .json(apiResponse({
        success:false,
        message:commonErrorResponse.internalError.message,
        data:null,
        code:commonErrorResponse.internalError.code
      }));
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password , requestFor } = req.body;
    const result = await AuthService.loginUser({ email, password,requestFor });
    
    if(result.role=="admin" && requestFor=="admin"){
      res.cookie('adminToken', result.userToken, {
      httpOnly: true,
      secure: false,           // locally we don’t use HTTPS
      sameSite: "lax", 
      path: "/",   
    }) 
    }else{
      res.cookie('customerToken', result.userToken, {
      httpOnly: true,
      secure: false,           // locally we don’t use HTTPS
      sameSite: "lax", 
      path: "/",   
    }) 
    }
    
    return res.status(200).json(
      apiResponse({
        success:true,
        message : UserSuccessResponse.userLoggedinSuccessfully.message,
        data:result,
        code : UserSuccessResponse.userLoggedinSuccessfully.code
      })
    );
  } catch (error: any) {
    console.log(error);
    if(error.code && error.message && error.statusCode)
    return res.status(error.statusCode).json( {
      status:false ,
      message:error.message,
      data:null,
      code:error.code
    })

    return res
      .status(500)
      .json(apiResponse({
        success:false,
        message:commonErrorResponse.internalError.message,
        data:null,
        code:commonErrorResponse.internalError.code
      }));
  }
};
export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { email} = req.body;
    const user = await User.findOne({email})
    if(!user)  return res.status(401).json( apiResponse({
        success:false,
        message : "User dont exist",
        data:"User dont exist",
        code : "User dont exist"
      }))
    if(user.isEmailVerified){
      return res.status(401).json( apiResponse({
        success:false,
        message : "user is already verified",
        data:"verfied",
        code : "verfiied"
      }))
    }
    const verificationToken = await tokenService.generateToken(user._id ,TOKEN_EXPIRY.EMAIL_VERIFY )
    user.emailVerificationToken = verificationToken
    await user.save()
    const verificationLink = `${process.env["BACKEND_URL"]}${process.env["PORT"]}/api/auth/verify-email-link?token=${verificationToken}&userId=${user._id}`
    await sendEmail(email , verificationLink)
    return res.status(200).json(
      apiResponse({
        success:true,
        message : "verification links is sent to email",
        data:"verfied",
        code : "verfiied"
      })
    );
  } catch (error: any) {
    console.log(error);
    if(error.code && error.message && error.statusCode)
     return res.status(error.statusCode).json( {
      status:false ,
      message:error.message,
      data:null,
      code:error.code
    })

    return res
      .status(500)
      .json(apiResponse({
        success:false,
        message:commonErrorResponse.internalError.message,
        data:null,
        code:commonErrorResponse.internalError.code
      }));
  }
};
export const verifyUserEmailByLink = async (req: Request, res: Response) => {
  try {
    const { token ,userId} = req.query;
    if(!token) return 
    const verifyToken = tokenService.verifyToken(String(token))
    if(!verifyToken){
      return res.status(400).json({message:"Verification Link is expired"})
    }
    const user = await User.findById(userId)
    if(!user) return res
      .status(401)
      .json(apiResponse({
        success:false,
        message:"user doesn't exist",
        data:null,
        code:"user doesn't exist"
      }));
    user.isEmailVerified = true
    await user?.save()

    return res.status(200).json(
      apiResponse({
        success:true,
        message : "Email verfied",
        data:"verfied",
        code : "verfiied"
      })
    );
  } catch (error: any) {
    console.log(error);
    if(error.code && error.message && error.statusCode)
    return res.status(error.statusCode).json( {
      status:false ,
      message:error.message,
      data:null,
      code:error.code
    })

    return res
      .status(500)
      .json(apiResponse({
        success:false,
        message:commonErrorResponse.internalError.message,
        data:null,
        code:commonErrorResponse.internalError.code
      }));
  }
};


