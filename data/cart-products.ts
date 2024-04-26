"use server";

import { db } from "@/lib/db";

export const findProductInCart = async (cartId: string, productId: string) => {
  try {
    const result = await db.cartProduct.findFirst({
      where: {
        cartId,
        productId,
      },
    });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.log("Error while fetching product from cartproduct:---", error);
    throw error;
  }
};

export const updateProductCart = async (
  existingcartProductInCartId: string,
  quantity: number
) => {
  try {
    const result = await db.cartProduct.update({
      where: {
        id: existingcartProductInCartId,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
    return;
  } catch (error) {
    console.log("Error while updating product from cartproduct:---", error);
    throw error;
  }
};

export const createProdcutCart = async (
  existingCartId: string,
  productId: string,
  quantity: number
) => {
  try {
    await db.cartProduct.create({
      data: {
        cart: {
          connect: { id: existingCartId },
        },
        product: {
          connect: { id: productId },
        },
        quantity,
      },
    });
  } catch (error) {
    console.log("Error creating prodcut:---", error);
    throw error;
  }
};
