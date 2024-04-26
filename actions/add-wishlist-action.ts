'use server';

import { createUserWishList, findWhishListByUserId, updateWishList } from "@/data/whishlist";


export const wishListAction = async (userId:string, productId:string) => {
    try {
        const existingWishlist:any = await findWhishListByUserId(userId);
        if (!existingWishlist) {
            const createdWishList = await createUserWishList(userId, productId);
            return {success: 'Prodcut added to wishlist'}
          } 
          else {
            const updatedWishList = await updateWishList(existingWishlist.id, productId);
            return {success: 'Prodcut added to wishlist'}
          }
    } catch (err) { 
        console.log('Error while creating wish list', err)
        return {error:"somthing wrong"}
    }
}