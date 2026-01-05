import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/auth.routes.js'
import paymentRouter from './routes/payment.routes.js'
import productRouter from './routes/product.routes.js'
import cors from 'cors'

dotenv.config({ path: process.env["NODE_ENV"] =="local" ? '.env.local' : '.env.development' }) //set path from root of folder
const app = express()

//connect my nodejs app with mongodb
mongoose.connect(process.env["MONGO_DB_URL"] ?? "") 
.then(()=>console.log("connected with mongodb"))
.catch((err)=>console.log("error connecting to mongodb", err))



app.use(cors(  {origin: "http://localhost:3000",credentials: true})) // if you will change it and if it cause it error it will show internet connection error to user
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);


app.get("/test",(res:any)=>{
    res.status(200).send("app working")
})

app.use("/api/user",userRouter)
app.use("/api/payment" , paymentRouter)
app.use("/api/product" , productRouter)

app.listen(process.env['PORT'],()=>{
    console.log("app running on port 8000")
})