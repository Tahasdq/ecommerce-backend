import Product from "../models/product.model.js"
import type { getAllProductFilter } from "../types/product.type.js"
import { createError, ProductErrorResponse } from "../utils/error.js"


const createProduct = async (data:any)=>{
   const response =  await Product.create(data)
   return response
}
const getProductById = async (id:any)=>{
   const reponse  = await Product.findById(id)
   return reponse
}
const updateProductById = async (id:any,payload:any) =>{
   const product = await Product.findById(id)
   if(!product)     throw createError(
        ProductErrorResponse.productNotFound.message,
      404,
       ProductErrorResponse.productNotFound.code,
   )
   Object.assign(product,payload)
   const response = await product?.save()
   return response
}

export const getAllProducts = async(filter:getAllProductFilter)=>{
    const response = await Product.find(filter)
    return response
}
export const deleteProduct = async (id:string)=>{
    const response = await Product.findByIdAndDelete(id)
    return response
}
export default {createProduct , getProductById,getAllProducts,deleteProduct , updateProductById}