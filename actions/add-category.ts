"use server";

import { createCategoryIndb, getCetgoryByName } from "@/data/category";
import { CategorySchema } from "@/schemas";
import { z } from "zod";

export const createCategory = async (
  value: z.infer<typeof CategorySchema>,
) => {
  const validation = CategorySchema.safeParse(value);

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const validatData = validation.data;
  try {
    const category = await getCetgoryByName(validatData.categoryName);
    if(category) {
      return { error: "Category already exists!" };
    }
    await createCategoryIndb(validatData);
    return {success: "Category successfully created"}
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to create category.",
      };
    }
  }
};
