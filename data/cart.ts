"use server";

import { db } from "@/lib/db";

export const findCartByUserId = async (userId: string) => {
  try {
    const result = await db.cart.findUnique({
      where: {
        userId,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.log("Error while getting cart", error);
    throw error;
  }
};

export const createCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    const result = await db.cart.create({
      data: {
        user: {
          connect: { id: userId },
        },
        products: {
          create: {
            product: {
              connect: { id: productId },
            },
            quantity,
          },
        },
      },
    });
    return;
  } catch (error) {
    console.log("Error while creating cart", error);
    throw error;
  }
};

export const removeProductFromCart = () => {
  
}