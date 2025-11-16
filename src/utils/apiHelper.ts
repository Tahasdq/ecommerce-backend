// response functin

import type { ApiResponse } from "../types/api.types.js"


export const apiResponse = ({success , message , data , code } : ApiResponse)=>{
    return {
        success,
        message,
        data,
        code
    }
}