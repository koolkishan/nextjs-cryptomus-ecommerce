"use server";

import { getProduct } from "@/data/product";

export const getProductByLimit = async (limit: number, offset = 0) => {
  try {
    const products = await getProduct(limit, offset);
    return products;
  } catch (error) {
    console.log("Error while getting product by limit", error);
  }
};
