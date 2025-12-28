import mongooose from "mongoose";

const productSchema = new mongooose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    star: { type: String , default:"1"},
    variants: [
      {
        size: { type: String },
        color: { type: String },
      },
    ],
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const products = mongooose.model("product", productSchema);

export default products;
