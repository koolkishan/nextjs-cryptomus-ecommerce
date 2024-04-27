
'use server';
import { createCart, findCartByUserId } from "@/data/cart";
import { createProdcutCart, findProductInCart, updateProductCart } from "@/data/cart-products";
import { getUserByEmailAction } from "./get-user-by-email-action";

export async function addToCart(email:string,  productId: string, quantity: number) {
  try {
    // Check if the user already has a cart
    const existingUser = await getUserByEmailAction(email);

    if(existingUser) {
      const existingCart = await findCartByUserId(existingUser.id);

    if (!existingCart) {
      await createCart(existingUser.id, productId, quantity);
    } else {
      // If the user already has a cart, check if the product is already in the cart
      const existingProductInCart = await findProductInCart(existingCart.id, productId)

      if (existingProductInCart) {
        // If the product is already in the cart, update its quantity
        await updateProductCart(existingProductInCart.id, quantity)
      } else {
        // If the product is not in the cart, add it
        await createProdcutCart(existingCart.id, productId, quantity);
      }
    }
    }
    console.log('Product added to cart successfully!');
    return {success: "Product added successfully"}
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return {error:'Something went wrong'}
  } 
}
