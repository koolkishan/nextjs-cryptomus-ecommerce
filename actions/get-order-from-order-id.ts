"use server";

import { db } from "@/lib/db";

export const getOrderFromOrderIdAction = async (orderId: string) => {
  try {
    const result = await db.order.findFirst({
      where: {
        id: orderId,
      },
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
    return result;
  } catch (error) {
    console.log("Error white getting order from order id:---", error);
  }
};
