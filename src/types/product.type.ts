export type getAllProductFilter = {
  category?: { $in: string[] };
  price?: { $gte: number; $lte: number };
  "variants.size"?: { $in: string[] };
};
export type ProductSuccessResponseKey = "ProductCreatedSuccessfully"  | "ProductUpdatedSuccessfully" | "ProductDeletedSuccessfully" | "fetchedProductsSuccessfully" | "fetchedProductSuccessfully"

