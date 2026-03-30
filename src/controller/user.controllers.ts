import { apiResponse } from "../utils/apiHelper.js";
import { commonErrorResponse } from "../utils/error.js";
import type { Request,Response } from "express";
import userService from '../services/user.service.js'

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const type = _req.query["type"]
    console.log("type",type)
    const data = await userService.getAllUsers({type})
    return res.status(200).json({message:"Users fetched successfully",data})
  } catch (error:any) {
    if (error.statusCode && error.code) {
      return res.status(error.statusCode).json(apiResponse({
        success: false,
        message: error.message,
        data: null,
        code: error.code,
      }));
    }
    
    return res.status(500).json(apiResponse({
      success: false,
      message: commonErrorResponse.internalError.message,
      data: null,
      code: commonErrorResponse.internalError.code,
    }));
  }
};