"use server";

import { getProductFromId } from "@/data/product";

export const getProductFromProductId = async (id: string) => {
  try {
    const product = await getProductFromId(id);
    return product;
  } catch (error) {
    console.log("Error while getting product", error);
  }
};
