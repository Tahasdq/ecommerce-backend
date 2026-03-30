// import { Order } from "../models/order.model.js"
import User from "../models/user.model.js"

export const getAllUsers = async (filters:any)=>{
    console.log("filters",filters)
    if(filters.type=="customer"){
        // const response = await Order.aggregate([
        //     {
        //         "$lookup":{
        //         from:"users",
        //         localField:"userId",
        //         foreignField:"_id",
        //         as:"user"
        //      }
        //     },
        //     { $unwind: "$user" },
        //     {"$group":{
        //         _id:"$user._id",
        //         email:{$first:"$user.email"},
        //         status:{$first:"$user.isActive"},
        //         createdAt:{$first:"$user.createdAt"},
        //         totalOrders:{$sum:1},
        //         totalAmountSpent:{$sum:"$amount"}
        //     }}
        // ])
        // const NoOrdersUsers = await User.find({_id:{$nin:response.map((item:any)=>item._id)}})
        // const shapedNoOrdersUsers= NoOrdersUsers.map((user)=>(
        //     {_id:user._id,email:user.email,status:user.isActive,createdAt:user.createdAt,totalOrders:0,totalAmountSpent:0}
        // ))
        // const endResult = [...response,...shapedNoOrdersUsers]
        const endResult = await User.aggregate([ // much better logic instead of aggregatin orders directly
            {
                $lookup:{
                    from:"orders",
                    localField:"_id",
                    foreignField:"userId",
                    as:"orders"
                }
            },{
                $project:{
                    _id:1,
                    email:1,
                    status:"$isActive",
                    createdAt:1,
                    totalOrders:{$size:"$orders"},
                    totalAmountSpent:{$sum:"$orders.amount"}
                }
            },
            {
                $sort:{
                    totalOrders:-1
                }
            }
        ])
        // console.log("endResult",endResult)
        return endResult
    }
    const response = await User.find()
    return response
}
   
export default{getAllUsers}