"use server";
import { db } from "@/lib/db";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: newStatus,
      },
    });
    return updatedOrder;
  } catch (error) {
    console.error(`Failed to update status for order ${orderId}:`, error);
    throw error;
  }
}
