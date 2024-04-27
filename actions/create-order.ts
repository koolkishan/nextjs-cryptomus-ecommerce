// import { PrismaClient } from '@prisma/client';
"use server";

import { db } from "@/lib/db";
import { getUserByEmailAction } from "./get-user-by-email-action";

// const prisma = new PrismaClient();

export async function createOrderAndOrderProducts(
  email: string,
  products: { productId: string; quantity: number }[],
  totalPrice: number,
  totalDiscount: number
) {
  try {
    // Create the order
    const existingUser = await getUserByEmailAction(email);

    if (existingUser) {
      const order = await db.order.create({
        data: {
          userId: existingUser?.id,
          totalPrice,
          totalDiscount,
          products: {
            createMany: {
              data: products,
            },
          },
          status: "PENDING",
        },
        include: {
          products: true,
        },
      });
      return order;
    }
    return null;
  } catch (error) {
    console.error("Error creating order and order products:", error);
    throw error;
  }
}

// Example usage
// createOrderAndOrderProducts(
//   "user_id_here",
//   [
//     { productId: "product_id_1", quantity: 2 },
//     { productId: "product_id_2", quantity: 1 },
//   ],
//   150
// );
