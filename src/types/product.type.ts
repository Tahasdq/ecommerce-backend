export type getAllProductFilter = {
  name?: { $regex: string; $options: string };
  category?: { $in: string[] };
  price?: { $gte: number; $lte: number };
  "variants.size"?: { $in: string[] };
};
export type ProductSuccessResponseKey = "ProductCreatedSuccessfully"  | "ProductUpdatedSuccessfully" | "ProductDeletedSuccessfully" | "fetchedProductsSuccessfully" | "fetchedProductSuccessfully"

