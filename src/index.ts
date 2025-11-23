import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/auth.routes.js'
import paymentRouter from './routes/payment.routes.js'
import cors from 'cors'

dotenv.config({ path: '.env.development' }) //set path from root of folder
const app = express()

//connect my nodejs app with mongodb
mongoose.connect("mongodb+srv://tahasdq99_db_user:5VwACrAjxQ7QISze@cluster0.zlwfvap.mongodb.net/ecommerce") 
.then(()=>console.log("connected with mongodb"))
.catch((err)=>console.log("error connecting to mongodb", err))



app.use(cors(  {origin: "http://localhost:3000",credentials: true})) // if you will change it and if it cause it error it will show internet connection error to user
app.use(express.json())


app.use("/api/user",userRouter)
app.use("/api/payment" , paymentRouter)

app.listen(process.env['PORT'],()=>{
    console.log("app running on port 8000")
})