import Product from "../models/product.model.js"
import type { getAllProductFilter } from "../types/product.type.js"


const createProduct = async (data:any)=>{
   const response =  await Product.create(data)
   return response
}
const getProductById = async (id:any)=>{
   const reponse  = await Product.findById(id)
   return reponse
}

export const getAllProducts = async(filter:getAllProductFilter)=>{
    const response = await Product.find(filter)
    return response
}
export const deleteProduct = async (id:string)=>{
    const response = await Product.findByIdAndDelete(id)
    return response
}
export default {createProduct , getProductById,getAllProducts,deleteProduct}