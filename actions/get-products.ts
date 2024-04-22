"use server";

import { getProduct } from "@/data/product";

export const getProducts = async () => {
  try {
    const products = await getProduct();
    return products;
  } catch (error) {
    console.log("Error while getting product by limit", error);
  }
};
