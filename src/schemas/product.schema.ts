import * as zod from "zod"

export const createProductSchema= zod.object({
    name: zod
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
    price:zod.coerce.number().min(400).max(10000),
    description:zod.string().min(2).max(1000),
    category:zod.enum(["men", "women", "kids", "accessories", "footwear"]),
    variants:zod.string().transform((value=>JSON.parse(value))).pipe(zod.array(zod.object({
        size:zod.string(),
        color:zod.string(),
        stock:zod.number()
    })))
})
export const updateProductSchema = zod.object({
     name: zod
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
    price:zod.coerce.number().min(400).max(10000),
   description:zod.string().min(2).max(1000),
    category:zod.enum(["men", "women", "kids", "accessories", "footwear"]),
    variants:zod.string().transform((value=>JSON.parse(value))).pipe(zod.array(zod.object({
        size:zod.string(),
        color:zod.string(),
        stock:zod.number()
    }))),
    isActive:zod.boolean()
}).partial()