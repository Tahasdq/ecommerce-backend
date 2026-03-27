import { Order } from "../models/order.model.js";
import type { Request, Response } from "express";
import OrderService from "../services/order.service.js";
export const orderStatus = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    const response = await Order.findOne({ stripeSessionId: data['sessionId'] });
    if(!response) return res.status(400).json({ message: "No Order Found" })
    const orderPaid = response.paymentStatus == "paid";
    if (orderPaid) {
      return res
        .status(201)
        .json({ message: "Payment successfull", order: response });
    } else {
      return res.status(400).json({ message: "Payment fail" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    // const data = req.query
    const response = await OrderService.getAllOrders();
    // const orderPaid=response.paymentStatus=="paid"
    if (response) {
      return res
        .status(200)
        .json({ message: "Orders fetched  successfull", order: response });
    } else {
      return res.status(400).json({ message: "No Order" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params["id"];
  try {
    if(!orderId) return res.status(400).json({ message: "Invlid orderId" })
    const response = await OrderService.getOrderById(orderId);
    if (response) {
      return res
        .status(200)
        .json({ message: "Order fetched  successfully", order: response });
    } else {
      return res.status(400).json({ message: "No Order Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getOrdersByUserId = async (req: Request, res: Response) => {
  const userId = req.params["id"];
  try {
        if(!userId) return res.status(400).json({ message: "Invalid userId" })

    const response = await OrderService.getOrderByUserId(userId);
    if (response) {
      return res
        .status(200)
        .json({ message: "Order fetched  successfully", order: response });
    } else {
      return res.status(400).json({ message: "No Order Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateOrderById = async (req: Request, res: Response) => {
  const orderId = req.params["id"];
  const payload = req.body
  try {
    if(!orderId) return res.status(400).json({ message: "Invalid orderId" })
    const response = await OrderService.updateOrderById(orderId , payload);
    if (response) {
      return res
        .status(200)
        .json({ message: "Order fetched  successfully", order: response });
    } else {
      return res.status(400).json({ message: "No Order Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

