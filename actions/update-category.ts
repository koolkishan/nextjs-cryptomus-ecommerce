"use server";
import { getCategoryFromDb, updateCategoryInDb } from "@/data/category";

export const updateCategory = async (categoryName: string, id: string) => {
  try {
    const category = await getCategoryFromDb(id);
    if (!category) return { error: "category not found" };
    await updateCategoryInDb(categoryName, id);
    return { success: "Category successfully updated" };
  } catch (err: unknown) {
    return {
      error: "Failed to update category",
    };
  }
};
