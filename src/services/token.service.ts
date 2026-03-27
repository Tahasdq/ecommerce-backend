
import  jwt from 'jsonwebtoken'
import {TOKEN_EXPIRY} from "../utils/tokenConstant.js"

type TokenExpiryValue = //pasing only the value type in here
  typeof TOKEN_EXPIRY[keyof typeof TOKEN_EXPIRY];

const generateToken = async (user:any , expiryTime :  TokenExpiryValue)=>{
try {
      return   jwt.sign({_id : user._id} , "hello123" , {expiresIn:expiryTime} )
} catch (error) {
   throw Error
}
     
  //  const token =  jwt.sign(user._id.toString() , "hello123" , {expiresIn:"60s"} ) //will not work there is science behind it man

}
const verifyToken = async (token:string) =>{
   try {
         return jwt.verify(token ,  "hello123")
   } catch (error) {
      throw new Error
      
   }
   
}

export default {generateToken , verifyToken}