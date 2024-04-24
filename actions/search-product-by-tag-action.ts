"use server";

import { searchProductsByTag } from "@/data/product";

export const searchProductsByTagAction = async (tag:string) => {
  try {
    const products = await searchProductsByTag(tag);
    return products;
  } catch (error) {
    console.log("Error while getting product from tag", error);
  }
};
