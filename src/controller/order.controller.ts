
import { Order } from "../models/order.model.js";
import type  { Request ,Response} from "express";
export const orderStatus = async(req:Request,res:Response)=>{
    try {
    const data = req.query
    const response = await Order.findOne({stripeSessionId:data.sessionId})
    const orderPaid=response.paymentStatus=="paid"
    if (orderPaid) {
            return res.status(201).json({ message: "Payment successfull", order: response });
        } else {
            return res.status(400).json({ message: "Payment fail" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
}