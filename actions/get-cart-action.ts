'use server';
import { findCartByUserId } from "@/data/cart";
import { getUserByEmailAction } from "./get-user-by-email-action";

export const getCartAction = async (email: string) => {
  try {
    const existingUser = await getUserByEmailAction(email);

    if (existingUser) {
      const existingCart = await findCartByUserId(existingUser.id);
      if (existingCart) {
        return existingCart;
      }
    }
    return null;
  } catch (error) {
    console.log("Error while getting cart", error);
  }
};
