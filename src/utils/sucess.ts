import type { ProductSuccessResponseKey } from "../types/product.type.js";
import type { ApiResponse, UserSuccessResponseKey } from "../types/user.types.js";

//use user success response
export const UserSuccessResponse : Record<UserSuccessResponseKey , ApiResponse> = {
  userRegisteredSuccessfully: {
    message: "User registered successfully.",
    code: "USER_REGISTERED",
  },
  userLoggedinSuccessfully: {
    message: "User Logged successfully.",
    code: "USER_LOGGEDIN",
  }
} as const ;
// use product sucess response 
export const ProductSuccessResponse : Record<ProductSuccessResponseKey , ApiResponse> = {
  ProductCreatedSuccessfully: {
    message: "Product created successfully.",
    code: "PRODUCT_CREATED",
  },
  ProductUpdatedSuccessfully: {
    message: "Product updated successfully.",
    code: "PRODUCT_UPDATED",
  },
  ProductDeletedSuccessfully: {
    message: "Product deleted successfully.",
    code: "PRODUCT_DELETED",
  },
  fetchedProductsSuccessfully: {
    message: "Products fetched successfully.",
    code: "PRODUCTS_FETCHED",
  },
  fetchedProductSuccessfully: {
    message: "Product fetched successfully.",
    code: "PRODUCT_FETCHED",
  },
} as const ;