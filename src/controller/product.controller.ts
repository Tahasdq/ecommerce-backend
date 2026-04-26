import productService from "../services/product.service.js";
import type { Response, Request } from "express";
import type { getAllProductFilter } from "../types/product.type.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";

import { commonErrorResponse, createError, ProductErrorResponse } from "../utils/error.js";
import { apiResponse } from "../utils/apiHelper.js";
import { validateFile } from "../utils/generalHelper.js";
import { uploadtoCloudinary } from "../config/cloudinary.js";
import { ProductSuccessResponse } from "../utils/sucess.js";



export const addProduct = async (req: Request, res: Response) => {
  try {
    await validateFile(req,res)
     if (!req.file) {
        throw (createError(
          "File is required.",
          400,
          "FILE_REQUIRED"
        ));
      }
    const data = req.body;
    let parsed = createProductSchema.safeParse(req.body)

    if (!parsed.success) {
      const errors = parsed.error?.issues.map(e => `${e.path.join('.')}: ${e.message}`);
      throw createError(
        `Validation error: ${errors.join(', ')}`,
        422,
        ProductErrorResponse.invalidProductData.code
      );
    }
    const  uploadResponse  = await uploadtoCloudinary(req.file.path , 'image' , true)
    const payload = {
      ...data ,
      price:Number(data.price),
      imagePublicId:uploadResponse.public_id,
      variants:JSON.parse(data.variants)
    }
    const response = await productService.createProduct(payload);
      return res
        .status(201)
        .json(apiResponse({ success: true,message: ProductSuccessResponse.ProductCreatedSuccessfully.message,code : ProductSuccessResponse.ProductCreatedSuccessfully.code,data: response }));
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
export const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params["id"];
    if (!productId) return res.status(400).json(apiResponse({
      success: false,
      message: ProductErrorResponse.productIdDoesNotExist.message,
      data: null,
      code:ProductErrorResponse.productIdDoesNotExist.code,
    }))
    await validateFile(req,res)
   
    const data = req.body;
    let parsed = updateProductSchema.safeParse(req.body)
    if (!parsed.success) {
      const errors = parsed.error?.issues.map(e => `${e.path.join('.')}: ${e.message}`);
      throw createError(
        `Validation error: ${errors.join(', ')}`,
        422,
        ProductErrorResponse.invalidProductData.code
      );
    }
    const  payload = {
      ...data ,
     ...(data.price && {price:Number(data.price)}),
     ...(data.variants && {variants:JSON.parse(data.variants)}),
    }
    if(req?.file?.path){
    const uploadResponse  = await uploadtoCloudinary(req.file.path , 'image' , true)
    payload.imagePublicId = uploadResponse.public_id
    }
    if(Object.keys(payload).length===0) return res.status(400).json(apiResponse({
      success: false,
      message: ProductErrorResponse.invalidProductData.message,
      data: null,
      code: ProductErrorResponse.invalidProductData.code,
    }))
    const response = await productService.updateProductById(productId , payload);
      return res
        .status(200)
        .json(apiResponse({ success: true,message: ProductSuccessResponse.ProductUpdatedSuccessfully.message,code : ProductSuccessResponse.ProductUpdatedSuccessfully.code,data: response }));
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

export const getbyId = async (req: Request, res: Response) => {
  try {
    const productId = req.params["id"];
    if (!productId) return res.status(400).json(apiResponse({
      success: false,
      message: ProductErrorResponse.productIdDoesNotExist.message,
      data: null,
      code:ProductErrorResponse.productIdDoesNotExist.code,
    }))
    const response = await productService.getProductById(productId);

    if (!response) return res.status(400).json(apiResponse({
      success: false,
      message: ProductErrorResponse.productNotFound.message,
      data: null,
      code: ProductErrorResponse.productNotFound.code,
    }));
    return res
        .status(200)
        .json(apiResponse({ success: true,message: ProductSuccessResponse.ProductDeletedSuccessfully.message,code : ProductSuccessResponse.ProductDeletedSuccessfully.code,data: response }));
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params["id"];
    if (!productId) return res.status(400).json(apiResponse({
      success: false,
      message: ProductErrorResponse.productIdDoesNotExist.message,
      data: null,
      code:ProductErrorResponse.productIdDoesNotExist.code,
    }))
    const response = await productService.deleteProduct(productId);

    if (!response) return res.status(400).json(apiResponse({
      success: false,
      message: ProductErrorResponse.productNotFound.message,
      data: null,
      code: ProductErrorResponse.productNotFound.code,
    }));
      return res
        .status(200)
        .json(apiResponse({ success: true,message: ProductSuccessResponse.ProductDeletedSuccessfully.message,code : ProductSuccessResponse.ProductDeletedSuccessfully.code,data: response }));
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const filter: getAllProductFilter = {};
    const { categories, minPrice, maxPrice, sizes, search } = _req.query;
    
    if (search && typeof search === "string") {
      filter.name = { $regex: search, $options: 'i' };
    }

    const filteredCategories =
      typeof categories === "string" ? categories.split(",") : undefined;
    const filteredSizes =
      typeof sizes === "string" ? sizes.split(",") : undefined;

    if (filteredCategories) {
      filter.category = { $in: filteredCategories };
    }
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    if (filteredSizes) {
      filter["variants.size"] = { $in: filteredSizes };
    }
    const response = await productService.getAllProducts(filter);
    return res
        .status(200)
        .json(apiResponse({ success: true,message: ProductSuccessResponse.fetchedProductsSuccessfully.message,code : ProductSuccessResponse.fetchedProductsSuccessfully.code,data: response }));
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
