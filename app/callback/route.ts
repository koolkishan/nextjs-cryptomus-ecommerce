import { db } from "@/lib/db";
import { NextRequest } from "next/server";
async function handler(req: NextRequest) {
  const data = await req.json();
  const { status, order_id } = data;
  if (status === "cancel") {
    await db.order.update({
      where: {
        id: order_id,
      },
      data: {
        orderStatus: status,
        paymentStatus: status,
      },
    });
  } else {
    await db.order.update({
      where: {
        id: order_id,
      },
      data: {
        paymentStatus: status,
      },
    });
  }
  return Response.json(true);
}
export { handler as GET, handler as POST };
