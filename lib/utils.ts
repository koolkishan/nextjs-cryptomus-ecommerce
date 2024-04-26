import { getUserByEmailAction } from "@/actions/get-user-by-email-action";
import { wishListAction } from "@/actions/add-wishlist-action";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function addProductToWishList(user: any, productId: string) {
  const dbUser = await getUserByEmailAction(user.email);
  if (dbUser) {
    const response = await wishListAction(dbUser?.id, productId);
    return response;
  }
}
