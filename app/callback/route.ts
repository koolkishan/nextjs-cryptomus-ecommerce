import { db } from "@/lib/db";
import {NextRequest} from "next/server";
async function handler(req:NextRequest) {
  const data = await req.json();
  const {status, order_id} = data.data;
  await db.order.update({
    where: {
      id: order_id,
    },
    data: {
      status: status,
    },
  });
  return Response.json(true);
}
export {handler as GET, handler as POST};
