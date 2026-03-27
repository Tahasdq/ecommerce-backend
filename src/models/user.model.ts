import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    userName : {
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    isEmailVerified:{
        type:Boolean,
        required:true,
        default:false
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
    },
    emailVerificationToken:{
        type:String,
    },
},{timestamps:true})

const User = mongoose.model('user' , userShema)
export default User