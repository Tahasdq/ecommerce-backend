import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    userName : {
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        enum:["admin","customer"],
        type:String,
        default:"customer",
        required:true
    }
},{timestamps:true})

const User = mongoose.model('user' , userShema)
export default User