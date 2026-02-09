import mongooose from "mongoose";

const productSchema = new mongooose.Schema(
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
    star: { type: Number, default: 1 },
    category: {
      type: String,
      enum: ["men", "women", "kids", "accessories", "footwear"],
      required: true,
    },
    sku: { type: String, unique: true },
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
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);

productSchema.virtual("status").get(function(){
  const totalStock = this.variants.reduce((sum,v)=>sum+v.stock,0)
  if (totalStock === 0) return "outStock";
  if (totalStock < 5) return "lowStock";
  return "inStock";
})

const products = mongooose.model("product", productSchema);

export default products;
