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
  return await db.products.findMany({
    include: {
      category: true,
      carts: true,
      wishlist: true,
    },
  });
};

export const getProductFromId = async (id: string) => {
  return await db.products.findFirst({
    where: {
      id,
    },
    include:{
      category: true,
      carts: true,
      wishlist: true,
    }
  });
};

export const updateProductIdDb = async (
  id: string,
  productName: string,
  categoryId: string,
  description: string,
  images: string[],
  tags: string[],
  price: number,
  discount: number,
  quantity: number
) => {
  await db.products.update({
    where: {
      id,
    },
    data: {
      productName,
      categoryId,
      description,
      tags,
      images,
      price,
      discount,
      quantity,
    },
  });
};

export const deleteProdcutFromDb = async (id: string) => {
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

export const getProductsFormCategoryId = async (categoryId: string) => {
  try {
    return await db.products.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
        carts: true,
        wishlist: true,
      },
    });
  } catch (error) {
    console.error("Error getting products from category Id:", error);
    throw error;
  }
};

// where: {
//   tags: {
//     some: {
//       contains: tag,
//       mode: 'insensitive' // Perform case-insensitive search
//     }
//   }
// }

export async function searchProductsByTag(tag: string) {
  const products = await db.products.findMany({
    where: {
      tags: {
        hasSome: [tag],
      },
    },
    include: {
      category: true,
      carts: true,
      wishlist: true,
    },
  });

  return products;
}

export async function getAllTags() {
  const tags = await db.products.findMany({
    select: {
      tags: true,
    },
  });
  const uniqueTags = Array.from(
    new Set(tags.flatMap((product) => product.tags))
  );

  return uniqueTags;
}
