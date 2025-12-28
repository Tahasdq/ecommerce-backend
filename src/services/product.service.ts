import Product from "../models/product.model.js"


const createProduct = async (data:any)=>{
   const response =  await Product.create(data)
   return response
}
const getProductById = async (id:any)=>{
   const reponse  = await Product.findById(id)
   return reponse
}

export default {createProduct , getProductById}