import { db } from "@/lib/db";
import {NextRequest} from "next/server";
async function handler(req:NextRequest) {
  const data = await req.json();
  console.log(typeof data);
  console.log('handler ~ data:', data);
  const {status, order_id} = data;
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
