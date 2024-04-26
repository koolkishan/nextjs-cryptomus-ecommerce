"use server";
import { getUserbyEmail } from "@/data/user";
import { removeProductFromWishlist } from "@/data/whishlist";

export const removeWishListAction = async (
  userEmail: string,
  productId: string
) => {
  console.log('productId:', productId)
  console.log('userEmail:', userEmail)
  try {
    const dbUser = await getUserbyEmail(userEmail);
    if (dbUser && dbUser.wishlist) {
      await removeProductFromWishlist(dbUser.wishlist?.id, productId);
      return { success: "Prodcut removed from wishlist" };
    }
  } catch (error) {
    console.log("removeWishListAction ~ error:", error);
    return { error: "somthing wrong" };
  }
};
