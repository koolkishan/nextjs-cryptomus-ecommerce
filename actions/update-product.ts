"use server";
import { getProductFromId, updateProductIdDb } from "@/data/product";

export const updateProduct = async (
  id: string,
  productName: string,
  categoryId: string,
  description: string,
  tag: string[] | [],
  price: number,
  images:string[],
  discount: number,
  quantity: number
) => {
  try {
    const product = await getProductFromId(id);
    const tagsInArr = tag;
    const priceInNum = +price;
    const discountInNum = discount ? +discount : 0;
    const qtyInNum = +quantity;
    if (!product) return { error: "product not found" };
    await updateProductIdDb(
      id,
      productName,
      categoryId,
      description,
      images,
      tagsInArr,
      priceInNum,
      discountInNum,
      qtyInNum
    );
    return { success: "Product successfully updated" };
  } catch (err: unknown) {
    return {
      error: "Failed to update product",
    };
  }
};
