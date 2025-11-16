import type { Request, Response } from "express";
import AuthService from "../services/auth.service.js";
import { apiResponse } from "../utils/apiHelper.js";
import { UserSuccessResponse } from "../utils/sucess.js";
import { commonErrorResponse } from "../utils/error.js";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const result = await AuthService.registerUserService({
      userName,
      email,
      password,
    });
    res.status(200).json(apiResponse({
      success: true,
      message: UserSuccessResponse.userRegisteredSuccessfully.message,
      data:result,
      code: UserSuccessResponse.userRegisteredSuccessfully.code
    }));
  } catch (error: any) {
    if (error.code && error.statusCode && error.message) {
      res
        .status(error.statusCode)
        .json(apiResponse({
          success: false,
          message: error.message,
          data: null,
          code: error.code,
        }));
    }
    res
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
    const { email, password } = req.body;
    const result = await AuthService.loginUser({ email, password });
    res.cookie('authToken', result.userToken, {
      httpOnly: true,
      secure: false,           // locally we don’t use HTTPS
      sameSite: "lax",         // or "none" + secure:true if using HTTPS
    }) 
    res.status(200).json(
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
    res.status(error.statusCode).json( {
      status:false ,
      message:error.message,
      data:null,
      code:error.code
    })

    res
      .status(500)
      .json(apiResponse({
        success:false,
        message:commonErrorResponse.internalError.message,
        data:null,
        code:commonErrorResponse.internalError.code
      }));
  }
};
