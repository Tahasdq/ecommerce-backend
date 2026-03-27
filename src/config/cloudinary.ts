import { v2 as cloudinary } from 'cloudinary'
import { createError, ProductErrorResponse } from '../utils/error.js';

cloudinary.config({ 
  cloud_name: process.env["CLOUDINARY_CLOUDNAME"] ?? "", 
  api_key: process.env["CLOUDINARY_API_KEY"] ?? "", 
  api_secret: process.env["CLOUDINARY_SECRET"] ?? ""
});


export const uploadtoCloudinary = async (filePath :string ,resource_type:'image'|'video' , overwrite= false)=>{
   let imageResponse
   try {
      imageResponse =  await cloudinary.uploader
    .upload(filePath, {
      resource_type: resource_type, 
      overwrite: overwrite, 
    })
    return imageResponse
   } catch (error) {
throw createError(ProductErrorResponse.cloudinaryUploadError.message, 500, ProductErrorResponse.cloudinaryUploadError.code)  
 }
   
   

}