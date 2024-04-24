'use server';
import { deleteProdcutFromDb, getProductFromId} from "@/data/product";

export const deleteProduct = async (id:string) => {
    try {
        const product = await getProductFromId(id);
        if (!product) return { error: "product not found" };
        await deleteProdcutFromDb(id);
        return { success: "Product successfully deleted" };
      } catch (err: unknown) {
        return {
          error: "Failed to delete Product",
        };
      }
} 