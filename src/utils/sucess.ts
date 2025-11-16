import type { UserResponseValue, UserSuccessResponseKey } from "../types/user.types.js";

//use success response
export const UserSuccessResponse : Record<UserSuccessResponseKey , UserResponseValue> = {
  userRegisteredSuccessfully: {
    message: "User registered successfully.",
    code: "USER_REGISTERED",
  },
  userLoggedinSuccessfully: {
    message: "User Logged successfully.",
    code: "USER_LOGGEDIN",
  }
} as const ;