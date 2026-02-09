import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number, // stored in major unit (AUD)
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    variantId:{
          type: mongoose.Schema.Types.ObjectId,
          required:true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
    stripeSessionId:{
        type:String,
        unique: true,
        require:true
    },
     paymentIntentId: {
      type: String,
    },
    // 👤 Guest info
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },


    items: {
      type: [orderItemSchema],
      required: true,
    },

    amount:{
        type:Number,
        require:true
    },
    // 📌 Status
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["created", "processing", "shipped", "delivered", "cancelled"],
      default: "created",
    },
     // 🚚 Shipping Address (from Stripe)
    shippingAddress: {
      name: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    
},{
    timestamps: true,
  })

  export const Order = mongoose.model("Order", orderSchema);
