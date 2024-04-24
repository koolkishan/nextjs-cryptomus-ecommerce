"use server";

import { createProductInDb } from "@/data/product";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const createProduct = async (
  value: z.infer<typeof ProductSchema>,
  imagesUrl: string[],
  categoryId: string
) => {
  const validation = ProductSchema.safeParse(value);

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const { productName, description, price, tags, discount, qty } =
    validation.data;
  const priceInNum = +price;
  const discountInNum = discount ? +discount : 0;
  const tagsInArr = tags.split(",");
  const qtyInNum = +qty;

  try {
    const createdProduct = await createProductInDb({
      productName,
      description,
      categoryId,
      price: priceInNum,
      tags: tagsInArr,
      images: imagesUrl,
      discount: discountInNum,
      quantity: qtyInNum,
    });

    return { success: "Product successfully created" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to verify user.",
      };
    }
  }
};
