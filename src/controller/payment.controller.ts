import type { Response } from "express";
import Stripe from "stripe"

const stripe = new Stripe('sk_test_51SVHb8JUGvmpU1wDc3RULQrwsfijW2fAzLBMQcZlLQlc5aHMV5gxVFFS37PZbexj1IQRoQG4BfpVviy6iyhNrQdV00ez91dwzF')

export const makePayment = async (res:Response)=>{
try {
     const session = await stripe.checkout.sessions.create({
    line_items: [
      {
      price_data: {
        currency: "aud",
        product_data: { name: "test"},
        unit_amount: 200 * 100,
      },
      quantity: 4,
    }
    ],
    mode: 'payment',
    success_url: `http://localhost:3000?success=true`,
  });
  res.json({ url: session.url });
} catch (error) {
         console.error(error);
    res.status(500).json({ error: "Checkout session failed" });
}
}