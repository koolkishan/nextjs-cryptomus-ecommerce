"use server";
import { categoriesWithProductCount, getCategoryWithAllProductsData } from "@/data/category";

export const getAllCategorisWithProductCount = async () => {
  const result = await categoriesWithProductCount();
  return result;
};

export const getAllCategoriesWithProduct =  async () => { 
  const result = await getCategoryWithAllProductsData();
  return result;
}