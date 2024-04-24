"use server";

import { getProductsFormCategoryName } from "@/data/category";

export const getCategoryProductFromName = async (categoryName:string) => {
  try {
    const products = await getProductsFormCategoryName(categoryName);
    return products;
  } catch (error) {
    console.log("Error while getting product by limit", error);
  }
};
