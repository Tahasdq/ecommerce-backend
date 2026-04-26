import {Order} from "../models/order.model.js"
import products from "../models/product.model.js"
import User from "../models/user.model.js"
export const totalRevenue =async ()=>{
    const response = await Order.aggregate([
        {
            $match:{
                paymentStatus:"paid"
            },
            },{

            $group:{
                _id:null,
                totalRevenue : {$sum:"$amount"}
            },
           
            },
        
    ])
    return response
}
export const totalOrders =async ()=>{
    const response = await Order.aggregate([
        // in here we can't use _id because _id is used to identify doc :
        // or simply $count stage means {{$group:{_id:null , totalOrders:{$sum:1}}}}  // which means using _id in $count
        // simply contradict the rule that we are nulliying _id and asking to create _id field as total orders
       { $count:"totalOrders"} ,
       
    ])
    return response
}
 export const totalCustomers =async ()=>{
    const response = await User.aggregate([
        {
        $match:{
            isActive:true,
            role:"customer"
        }
      }, 
      {
        $group:{
            _id:null ,
            totalCustomers : {$sum:1}
        }
      }
    ])
    return response
}
export const totalProducts =async ()=>{
    const response = await products.aggregate([
        {
        $match:{
            isActive:true,
        }
      }, 
      {
        $group:{
            _id:null ,
            totalProducts : {$sum:1}
        }
      }
    ])
    return response
}
export const topProducts =async ()=>{
    const response = await Order.aggregate([
  {
    $match: {
      paymentStatus: "paid"
    }
  },
  {
    $unwind: "$items"
  },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "product"
    }
  },
  {
    $unwind: {
      path: "$product"
    }
  },
  {
    $setWindowFields: {
      output: {
        totalStoteRevenue: { $sum: "$amount" } 
      }
    }
  },
  {
    $group: {
      _id: "$product.name",
      totalSales: { $sum: 1 },
      totalRevenue: { $sum: "$product.price" },
      totalStoteRevenue : {$first:"$totalStoteRevenue"},
    }
  },

  {
    $addFields: {
      percentage: {
        $multiply: [
          {
            $divide: [
              "$totalRevenue",
              "$totalStoteRevenue"
            ]
          },
          100
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      productName: "$_id",
      totalSales: 1,
      totalRevenue: 1,
      percentage: 1,
      totalStoteRevenue: 1
    }
  },
  {
    $sort: {
      totalSales: -1
    }
  },
  {
    $limit: 5
  }
])
    return response
}
export const recentOrders =async ()=>{
    const response = await Order.aggregate([
        {
            $match:{
                paymentStatus:"paid"
            },
            },{

            $group:{
                _id:null,
                totalRevenue : {$sum:"$amount"}
            }
             }
        
    ])
    return response
}
export const salesOverview =async ()=>{
    const response = await Order.aggregate([
        {
            $match:{
                paymentStatus:"paid"
            },
            },{

            $group:{
                _id:null,
                totalRevenue : {$sum:"$amount"}
            }
             }
        
    ])
    return response
}
export const totalSalesPerMonth =async ()=>{
  const startingDateofYear = new Date(new Date().getFullYear() , 0 ,1)
  const lastDateofYear = new Date(new Date().getFullYear() , 12 ,31)
  const response = await Order.aggregate([
    {
      $match:{
        paymentStatus:"paid",
        createdAt : {$gt: new Date(startingDateofYear) , $lt : new Date(lastDateofYear)}
      },
      
    },
    {
      $group:{
        _id:{$month:"$createdAt"},
        totalSales:{$sum:"$amount"}
      }
    }
  ])
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  for(let i =1 ; i<=12 ; i++){
    if(!response.every(item=>item._id==i)){
      response.push({ _id: i, totalSales: 0 });
    }
  }
  response.sort((a,b)=>a._id-b._id)
   response.forEach(item => {
  item._id = months[item._id - 1];
  });
  return response
}
export default {totalRevenue,totalOrders,totalCustomers,totalProducts,topProducts,recentOrders,salesOverview , totalSalesPerMonth}