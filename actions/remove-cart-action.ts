"use server";
import { db } from "@/lib/db";
import { getUserByEmailAction } from "./get-user-by-email-action";

export async function removeProductFromCart(email: string, productId: string) {
  try {
    const dbUser = await getUserByEmailAction(email);
    const userCart = await db.cart.findUnique({
      where: {
        userId: dbUser?.id,
      },
      include: {
        products: true,
      },
    });

    if (dbUser) {
      if (!userCart) {
        throw new Error("User cart not found");
      }

      const cartProductToDelete = userCart.products.find(
        (product) => product.productId === productId
      );

      if (!cartProductToDelete) {
        throw new Error("Product not found in cart");
      }

      await db.cartProduct.delete({
        where: {
          id: cartProductToDelete.id,
        },
      });
    }
    return {success: 'Product successfully removed'}
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
}
