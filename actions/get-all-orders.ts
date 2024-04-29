"use server";

import { db } from "@/lib/db";

export const getAllOrderAction = async () => {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.log("Error while fetching all order:---", error);
  }
};
