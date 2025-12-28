import productService from "../services/product.service.js"
import type { Response ,Request } from "express";

export const addProduct = async(req:Request,res:Response)=>{
    try {
    const data = req.body
    const response = await productService.createProduct(data)
    if (response) {
            return res.status(201).json({ message: "Product created successfully", product: response });
        } else {
            return res.status(400).json({ message: "Failed to create product" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
}

export const getbyId = async(req:Request,res:Response)=>{
    try {
    const productId = req.params["id"]
    if(!productId) return  res.status(200).json("Product id dont exist")
    const response = await productService.getProductById(productId)
    if(!response) return res.status(200).json("Product dont exist")
    return res.status(200).json(response)
    } catch (error) {
       return res.status(500).json({ message: "Internal Server Error" });
    }
    
}

