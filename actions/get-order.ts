"use server";

import { db } from "@/lib/db";
import { getUserByEmailAction } from "./get-user-by-email-action";

export const getOrderProductAction = async (email: string) => {
  try {
    const existingUser = await getUserByEmailAction(email);

    if (existingUser) {
        const result = await db.order.findMany({
            where: {
              userId:existingUser.id,
            },
            include: {
              products: {
                include: {
                  product: true,
                },
              },
            },
          });
          return result;
      }
    return;
  } catch (error) {}
};
