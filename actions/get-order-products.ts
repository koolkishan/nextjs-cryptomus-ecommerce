"use server";

import { db } from "@/lib/db";

export const getOrderProductAction = async (orderId: string) => {
  try {
    const result = await db.order.findMany({
      where: {
        id: orderId,
        status: "UNPROCESSED",
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    console.log(result, ":::::");
    return result;
  } catch (error) {}
};
