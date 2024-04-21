"use server";

import { db } from "@/lib/db";

export const createProductInDb = async ({
  productName,
  description,
  category,
  price,
  tags,
  images,
  discount,
  quantity,
}: {
  productName: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  images: string[];
  discount: number;
  quantity: number;
}) => {
  await db.products.create({
    data: {
      productName,
      description,
      category,
      price,
      tags,
      images,
      discount,
      quantity,
    },
  });
};

export const getProduct = async (limit: number, offset: number) => {
  return await db.products.findMany({
    take: limit,
    skip: offset,
  });

};
