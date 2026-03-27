import type { UserErrorResponseKey, ApiResponse } from "../types/user.types.js";

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


export const UserErrorResponse : Record<UserErrorResponseKey , ApiResponse> = {
  userAreadyExist: {
    message: "User Already exist with this email.",
    code: "USER_ALREADY_EXIST",
  },
  invalidCredentials: {
    message: "Invalid credentials.",
    code: "INVALID_CREDENTIALS",
  },
  emailAlreadyVerified :{
    message:"Email is Already Verfiied",
    code: "EMAIL_ALREADY_VERIFIED",
  }
} as const ;


export const ProductErrorResponse = {
  invalidProductData: {
    message: "Invalid product data provided.",
    code: "INVALID_PRODUCT_DATA",
  },
  fileUploadFailed: {
    message: "File upload failed.",
    code: "FILE_UPLOAD_FAILED",
  },
  fileTooLarge: {
    message: "File size exceeds 1MB limit.",
    code: "FILE_TOO_LARGE",
  },
  productNotFound: {
    message: "Product not found.",
    code: "PRODUCT_NOT_FOUND",
  },
  deletionFailed: {
    message: "Failed to delete product.",
    code: "DELETION_FAILED",
  },
  invalidImageType: {
    message: "Invalid image type. Only JPEG, JPG, PNG, and GIF are allowed.",
    code: "INVALID_IMAGE_TYPE",
  },
  cloudinaryUploadError: {
    message: "Cloudinary upload failed",
    code: "UPLOAD_FAILED",
  },
  productIdDoesNotExist: {
  message: "Product ID does not exist",
  code: "PRODUCT_ID_DOES_NOT_EXIST",
}
} as const;