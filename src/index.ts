import "./utils/env.js" // kept it in separate file bcz in ESM all import are loaded before

import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/auth.routes.js'
import paymentRouter from './routes/payment.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from "./routes/order.routes.js"
import userRouter from "./routes/users.routes.js"
import dashboardRouter from "./routes/dashboard.route.js"
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import type { Request,Response } from "express"

const app = express()

//connect my nodejs app with mongodb
mongoose.connect(process.env?.["MONGO_DB_URL"] ?? "") 
.then(()=>console.log("connected with mongodb"))
.catch((err)=>console.log("error connecting to mongodb", err))



app.use(cors(  {origin: process.env?.["FRONTEND_URL"],credentials: true})) // if you will change it and if it cause it error it will show internet connection error to user
// Global middleware
app.use(express.json({
  verify: (req:Request, _res:Response, buf) => {
    // We check if the URL starts with our webhook path
    if (req.originalUrl.startsWith('/api/payment/webhook')) {
      req.rawBody = buf; // buf is the raw Buffer from the request
    }
  }
}));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(morgan("dev"))
app.use(cookieParser());


app.get("/test",(res:any)=>{
    res.status(200).send("app working")
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/payment" , paymentRouter)
app.use("/api/product" , productRouter)
app.use("/api/order",orderRouter )
app.use("/api/dashboard",dashboardRouter )


app.listen(process.env['PORT'],()=>{
    console.log("app running on port 8000")
})