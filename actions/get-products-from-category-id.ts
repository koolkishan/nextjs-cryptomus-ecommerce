'use server'
import { getProductsFormCategoryId } from "@/data/product";

export const getProductFromCategoryId = async (categoryId: string) => {
    try {
        const products = await getProductsFormCategoryId(categoryId);
        return products;
    } catch (error) {
        console.error(`Error retrieving products for category "${categoryId}":`, error);
        throw error;
    }
};
