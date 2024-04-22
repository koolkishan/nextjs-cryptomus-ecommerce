"use server";
import { categoriesWithProductCount } from "@/data/category";

export const getAllCategorisWithProductCount = async () => {
  const result = await categoriesWithProductCount();
  return result;
};
