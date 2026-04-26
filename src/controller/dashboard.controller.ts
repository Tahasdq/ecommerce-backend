
import type { Request,Response } from "express";
import dashboardService  from "../services/dashboard.service.js"
import { apiResponse } from "../utils/apiHelper.js";
import { commonErrorResponse } from "../utils/error.js";


export const totalRevenue = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalRevenue()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total revenue",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_REVENUE"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total revenue fetched successfully",
            data:result,
            code:"TOTAL_REVENUE_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const totalOrders = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalOrders()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total order",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_ORDERS"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total orders fetched successfully",
            data:result,
            code:"TOTAL_ORDERS_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const totalCustomers = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalCustomers()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total customers",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_CUSTOMERS"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total customers fetched successfully",
            data:result,
            code:"TOTAL_CUSTOMERS_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const totalProducts = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalProducts()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total products",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_PRODUCTS"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total products fetched successfully",
            data:result,
            code:"TOTAL_PRODUCTS_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const topProducts = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.topProducts()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch top products",
            data:result,
            code:"FAILED_TO_FETCH_TOP_PRODUCTS"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total revenue fetched successfully",
            data:result,
            code:"TOTAL_REVENUE_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const recentOrders = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalRevenue()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total revenue",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_REVENUE"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total revenue fetched successfully",
            data:result,
            code:"TOTAL_REVENUE_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const salesOverview = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalRevenue()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total revenue",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_REVENUE"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total revenue fetched successfully",
            data:result,
            code:"TOTAL_REVENUE_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }
export const totalSalesPerMonth = async(_req:Request,res:Response)=>{
    try {
        const result = await dashboardService.totalSalesPerMonth()
        if(!result){
            return  res.status(400).json(apiResponse({
            success:false,
            message:"Failed to fetch total sales per month",
            data:result,
            code:"FAILED_TO_FETCH_TOTAL_SALES_PER_MONTH"
        }))
        }
        return res.status(200).json(apiResponse({
            success:true,
            message:"total sales per month fetched successfully",
            data:result,
            code:"TOTAL_SALES PER_MONTH_FETCHED_SUCCESSFULLY"
        }))
    } catch (error:any) {
         if(error.code && error.message && error.statusCode)
             return res.status(error.statusCode).json( {
              status:false ,
              message:error.message,
              data:null,
              code:error.code
            })
        
            return res
              .status(500)
              .json(apiResponse({
                success:false,
                message:commonErrorResponse.internalError.message,
                data:null,
                code:commonErrorResponse.internalError.code
              }));
          }
 }



export default {totalRevenue,totalOrders,totalCustomers,totalProducts,topProducts,recentOrders,salesOverview ,totalSalesPerMonth}