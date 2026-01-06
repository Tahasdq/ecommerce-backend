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
    }
},{timestamps:true})

export const User = mongoose.model('user', userShema);
