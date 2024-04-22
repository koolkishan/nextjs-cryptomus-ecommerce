import * as z from "zod";

export const ProductSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name required",
  }),
  description: z.string().min(1, {
    message: "Product description required",
  }),
  category: z.string().min(1, {
    message: "Category required",
  }),
  price: z.string().min(1, {
    message: "Price required",
  }),
  discount: z.string().min(0).max(100),
  tags: z.string().min(1, {
    message: "Tags required",
  }),
  qty: z.string().min(1, {
    message: "Quantity required",
  }),
});

export const CategorySchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category name required",
  })
})
