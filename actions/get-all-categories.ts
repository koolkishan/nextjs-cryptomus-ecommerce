"use server";

import { getAllCategories } from "@/data/category";

export const getCategories = async () => {
  try {
    const categories = await getAllCategories();
    return categories;
  } catch (error) {
    console.log("Error while getting product by limit", error);
  }
};
