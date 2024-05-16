"use server";

import { db } from "@/lib/db";

export const createCategoryIndb = async (categoryData: {
  categoryName: string;
}) => {
  const createdCategory = await db.categories.create({
    data: categoryData,
  });
};

export const getCetgoryByName = async (categoryName: string) => {
  const category = await db.categories.findFirst({
    where: {
      categoryName,
    },
  });
  return category;
};

export const getAllCategories = async () => {
  const allCategories = await db.categories.findMany();
  return allCategories;
};

export const categoriesWithProductCount = async () => {
  const result = await db.categories.findMany({
    select: {
      id: true,
      categoryName: true,
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  return result;
};

export const updateCategoryInDb = async (categoryName: string, id: string) => {
  await db.categories.update({
    where: {
      id,
    },
    data: {
      categoryName,
    },
  });
};

export const getCategoryFromDb = async (id: string) => {
  return await db.categories.findFirst({
    where: {
      id,
    },
  });
};

export const deleteCategoryFromDb = async (id: string) => {
  try {
    return await db.categories.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getProductsFormCategoryName = async (categoryName: string) => {
  try {
    return await db.categories.findMany({
      where: {
        categoryName,
      },
      include: {
        products: true,
      },
    });
  } catch (error) {
    console.error("Error getting products from category:", error);
    throw error;
  }
};

export const getCategoryWithAllProductsData = async () => {
  try {
    const result = await db.categories.findMany({
      select: {
        id: true,
        categoryName: true,
        products: true,
      },
    });
    return result;
  } catch (error) {
    console.log("Cannot find category", error);
  }
};
