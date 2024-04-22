"use server";

import { db } from "@/lib/db";

export const createProductInDb = async ({
  productName,
  description,
  categoryId,
  price,
  tags,
  images,
  discount,
  quantity,
}: {
  productName: string;
  description: string;
  categoryId: string;
  price: number;
  tags: string[];
  images: string[];
  discount: number;
  quantity: number;
}) => {
  const data = await db.products.create({
    data: {
      productName,
      description,
      categoryId,
      price,
      tags,
      images,
      discount,
      quantity,
    },
  });
};

export const getProduct = async () => {
  return await db.products.findMany();

};

export const getProductFromId = async (id:string) => {
  return await db.products.findFirst({
    where: {
      id,
    },
  });
}

export const updateProductIdDb = async (id:string, productName:string, categoryId:string, description:string, tags:string[], price:number, discount:number, quantity:number) => {
  await db.products.update({
    where: {
      id,
    },
    data: {
      productName,
      categoryId,
      description,
      tags,
      price,
      discount,
      quantity,
    },
  });
}

export const deleteProdcutFromDb = async (id: string) => {
  console.log("deleteCategoryFromDb ~ id:", id);
  try {
    return await db.products.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};