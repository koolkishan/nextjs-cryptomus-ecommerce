'use server';
import { deleteCategoryFromDb, getCategoryFromDb } from "@/data/category";

export const deleteCategory = async (id:string) => {
    try {
        const category = await getCategoryFromDb(id);
        if (!category) return { error: "category not found" };
        await deleteCategoryFromDb(id);
        return { success: "Category successfully deleted" };
      } catch (err: unknown) {
        return {
          error: "Failed to delete category",
        };
      }
} 