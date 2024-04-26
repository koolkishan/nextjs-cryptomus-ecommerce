"use server";

import { db } from "@/lib/db";

export const findWhishListByUserId = async (userId: string) => {
  try {
    const result = await db.wishlist.findUnique({
      where: {
        userId,
      },
    });
    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    console.log("Getting error while fetching whislist from user id", error);
  }
};

export const createUserWishList = async (userId: string, productId: string) => {
  try {
    await db.wishlist.create({
      data: {
        user: {
          connect: { id: userId },
        },
        products: {
          connect: { id: productId },
        },
      },
    });
  } catch (error) {
    console.log("Error while creating wishlist", error);
  }
};

export const updateWishList = async (
  existingWhishListId: string,
  productId: string
) => {
  try {
    await db.wishlist.update({
      where: {
        id: existingWhishListId,
      },
      data: {
        products: {
          connect: { id: productId },
        },
      },
    });
  } catch (error) {
    console.log("Error while updating existing wish list", error);
  }
};

export const removeProductFromWishlist = async (wishlistId: string, productId: string) => {
  try {
    await db.wishlist.update({
      where: {
        id: wishlistId,
      },
      data: {
        products: {
          disconnect: { id: productId }, // Disconnect the product from the wishlist
        },
      },
    });
  } catch (error) {
    console.log("Error removing product from wishlist:", error);
  }
};