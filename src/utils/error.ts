import type { UserErrorResponseKey, UserResponseValue } from "../types/user.types.js";

export const createError = (
  errMessage: string,
  statusCode: number,
  code: string = ""
) => {
  const error = new Error(errMessage);
  Object.assign(error, { statusCode }, { code }); // we are just combining it basically object.assign creates a new type
  return error;
};

export const commonErrorResponse = {
  internalError : {
    message:"Internal servor error",
    code:"INTERNAL_SERVER_ERROR"
  }
} as const


export const UserErrorResponse : Record<UserErrorResponseKey , UserResponseValue> = {
  userAreadyExist: {
    message: "User Already exist with this email.",
    code: "USER_ALREADY_EXIST",
  },
  invalidCredentials: {
    message: "Invalid credentials.",
    code: "INVALID_CREDENTIALS",
  },
} as const ;
