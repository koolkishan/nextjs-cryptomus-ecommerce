
'use server';
import { createCart, findCartByUserId } from "@/data/cart";
import { createProdcutCart, findProductInCart, updateProductCart } from "@/data/cart-products";
import { getUserByEmailAction } from "./get-user-by-email-action";

export async function addToCart(email:string,  productId: string, quantity: number) {
  try {
    const existingUser = await getUserByEmailAction(email);

    if(existingUser) {
      const existingCart = await findCartByUserId(existingUser.id);

    if (!existingCart) {
      await createCart(existingUser.id, productId, quantity);
    } else {
      const existingProductInCart = await findProductInCart(existingCart.id, productId)

      if (existingProductInCart) {
        await updateProductCart(existingProductInCart.id, quantity)
      } else {
        await createProdcutCart(existingCart.id, productId, quantity);
      }
    }
    }
    return {success: "Product added successfully"}
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return {error:'Something went wrong'}
  } 
}
