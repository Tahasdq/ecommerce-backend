import { Order } from "../models/order.model.js"
type Id =string

const getAllOrders = async ()=>{
   const response =  await Order.find()
   return response
}
const getOrderById = async (id:Id)=>{
   const response =  await Order.findById(id)
   return response
}
const getOrderByUserId = async(userId:Id)=>{
   // const userId = Types.ObjectId.createFromHexString(userid);
   const response =  await Order.find({userId:userId})
   return response
}
const updateOrderById = async (id:Id,payload:any)=>{
   const response =  await Order.findByIdAndUpdate(id ,payload )
   return response
}
export default {getAllOrders,getOrderById , updateOrderById , getOrderByUserId}