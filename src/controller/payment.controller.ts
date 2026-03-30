import type { Request , Response } from "express";
import Stripe from "stripe";
import { Order } from "../models/order.model.js";
const stripe = new Stripe(process.env['STRIPE_KEY']!);
import mongoose from "mongoose";
import products from "../models/product.model.js";

export const makePayment = async (req: Request, res: Response) => {
  try {
    const { cartData, totalPrice, data: personalData } = req.body;
    const user = req.user;
    const orderData = cartData.map((data:any) => ({
      productId: new mongoose.Types.ObjectId(data.id),
      name: data.name,
      unitPrice: data.price,
      quantity: data.quantity,
      variantId: data.variantId,
    }));
    
     const order = await Order.create({ // creating unpaid order
      email: personalData.email,
      phone: personalData.phone,
      items: orderData,
      amount: totalPrice,
      userId:user._id,
      shippingAddress: {
        line1: personalData.address,
        city: personalData.city,
        state: personalData.state,
      },
    });
    const line_items = cartData.map((item:any) => ({
      price_data: {
        currency: "pkr",
        product_data: { name: item.name },
        unit_amount:
          (item.price / 282) * 100 < 50
            ? (item.price + ((50 / 100) * 284 - item.price)) * 100
            : item.price * 100,
      },
      quantity: item.quantity,
    }));
    
   
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: `${personalData.email}`,
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: `${process.env?.["FRONTEND_URL"]}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env?.["FRONTEND_URL"]}/cancel`,
    });

    await Order.findByIdAndUpdate(order._id, {
      stripeSessionId: session.id,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Checkout session failed" });
  }
};

export const webhook = async (req:Request, res:Response): Promise<void> => {
  // Use express.raw for the webhook route ONLY

  const sig = req.headers["stripe-signature"];
  const webHookSecret =  process.env?.["STRIPE_WEBHOOK_SECRET"]
  if(!sig || !webHookSecret ) return 
  let event;

  try {
    // Construct the event using the raw body, signature, and secret
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      webHookSecret,
    );
  } catch (err : any) {
    console.error(`Webhook Error: ${err.message}`);
     res.status(400).send(`Webhook Error: ${err.message}`);
     return
    
  }

  // Handle specific event types
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const orderId = session.metadata?.["orderId"];
      if (!orderId) return;

      const order = await Order.findById(orderId);
      if (!order) return;

      if (order.paymentStatus === "paid") return;
      const items  = order.items.map((item)=>item);

      const productFetched = await products.find({_id:{$in:items.map((item)=>item.productId)}})
      await Promise.all(
        productFetched.map((product:any)=>{
        items.forEach((item:any)=>{
          const targetVariant=product.variants.find((v:any) => v?._id.toString() === item.variantId.toString())
          if(targetVariant){
            targetVariant.quantity -= item.quantity;
          }
        })
        return  product.save()
      })
    );
      order.paymentStatus = "paid";

      await order.save();

      console.log("Payment was successful for:", session.customer_email);
      // Logic to fulfill the order goes here
      break;

    case "invoice.payment_failed":
      // Handle failed subscription payment
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt
  res.status(200).json({ received: true });
};
