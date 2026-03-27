import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["men", "women", "kids", "accessories", "footwear"],
      required: true,
    },
    imagePublicId:{type:String, required:true},
    sku: { type: String },
    variants: [
      {
        size: { type: String },
        color: { type: String },
        stock: {
          type: Number,
          default:0
        },
        price: { type: Number }, // optional: if variant price differs
      },
    ],
    status: {
    type: String,
    enum: ["inStock", "lowStock", "outOfStock"]
   },
    totalStock:{type:Number},
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);



productSchema.pre("save",function(){
  const totalStock = this.variants.reduce((sum,v)=>sum+v.stock,0)
  this.totalStock = totalStock;  // always set this first
  
  if (totalStock === 0) return this.status = "outOfStock";
  if (totalStock < 5) return this.status  = "lowStock";
  return this.status = "inStock";
})
const products = mongoose.model("product", productSchema);

export default products;
