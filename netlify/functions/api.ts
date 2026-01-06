import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../../src/routes/auth.routes.js';
import paymentRouter from '../../src/routes/payment.routes.js';
import productRouter from '../../src/routes/product.routes.js';
import cors from 'cors';
import Serverless from 'serverless-http';
dotenv.config({ path: process.env?.["NODE_ENV"] == "local" ? '.env.local' : '.env.development' }); //set path from root of folder
const app = express();
//connect my nodejs app with mongodb
mongoose.connect(process.env?.["MONGO_DB_URL"] ?? "")
    .then(() => console.log("connected with mongodb"))
    .catch((err) => console.log("error connecting to mongodb", err));
app.use(cors({ origin: process.env?.["FRONTEND_URL"], credentials: true })); // if you will change it and if it cause it error it will show internet connection error to user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.get("/api/test",(_req:any,res:any)=>{
    res.status(200).send("app working")
})
console.log("/api/user",typeof userRouter)
console.log("/api/payment",typeof paymentRouter)
console.log("/api/product",typeof productRouter)
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/product", productRouter);
// app.listen(process.env['PORT'],()=>{
//     console.log("app running on port 8000")
// })
export const handler = Serverless(app);
//# sourceMappingURL=api.js.map