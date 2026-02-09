
import  jwt from 'jsonwebtoken'

 const generateToken = async (user:any)=>{
     const token =  jwt.sign({_id : user._id} , "hello123" , {expiresIn:"10d"} )
  //  const token =  jwt.sign(user._id.toString() , "hello123" , {expiresIn:"60s"} ) //will not work there is science behind it man

     return token
}
const verifyToken = async (token:string) =>{
   return jwt.verify(token ,  "hello123")
}

export default {generateToken , verifyToken}