import multer from "multer"
import { createError, ProductErrorResponse } from "./error.js";
import path from "path";
import type  { Request, Response } from "express";
function checkFileType(file:Express.Multer.File, cb:multer.FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("INVALID_IMAGE_TYPE"));
  }
}
const upload = multer({ 
    limits: { fileSize: 6000000 ,  }, //6mb
    fileFilter: function(_req, file, cb) {
    checkFileType(file, cb);
   },
    dest: 'uploads/' 
}).single("productImage")

  export function validateFile(req:Request,res:Response) : Promise<void>{
   return  new Promise((resolve,reject)=>{
      upload(req,res,(err:any)=>{
        if(err){
          if (err.code === 'LIMIT_FILE_SIZE') {
          reject(createError(
            ProductErrorResponse.fileTooLarge.message,
            413,
            ProductErrorResponse.fileTooLarge.code
          ));
        
        } else if (err.code === 'INVALID_IMAGE_TYPE)') {
            reject(createError(
                ProductErrorResponse.invalidImageType.message,
                413,
                ProductErrorResponse.invalidImageType.code
            ));
        }else {
          reject(createError(
            ProductErrorResponse.fileUploadFailed.message,
            400,
            ProductErrorResponse.fileUploadFailed.code
          ));
        }
        }
        
        resolve()
    })
    })
  }