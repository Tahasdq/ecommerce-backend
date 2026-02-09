export type getAllProductFilter = {
  category?: { $in: string[] };
  price?: { $gte: number; $lte: number };
  "variants.size"?: { $in: string[] };
};
