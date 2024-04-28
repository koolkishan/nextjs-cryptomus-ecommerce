"use server";

import { db } from "@/lib/db";
import { getUserByEmailAction } from "./get-user-by-email-action";
import md5 from "md5";
import axios from "axios";

export async function createOrderAndOrderProducts(
  email: string,
  products: { productId: string; quantity: number }[],
  totalPrice: number,
  totalDiscount: number
) {
  try {
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
          status: "Pending",
        },
        include: {
          products: true,
        },
      });
      if (order) {
        console.log(order, "???>><<");
        const endPoint = "https://api.cryptomus.com/v1/payment";
        const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
        const amount = order.totalPrice - order.totalDiscount;
        const data = {
          currency: "USD",
          amount: amount.toString() + ".00",
          order_id: order.id.toString(),
          lifetime: 300,
          url_callback:
            "https://d2ba-2409-4080-9d98-8ed9-1661-4da5-b733-5594.ngrok-free.app/callback?id=" +
            order.id,
          url_return: `http://localhost:3000`,
        };
        const merchant = process.env.CRYPTOMUS_MERCHANT_ID as string;
        const sign = md5(btoa(JSON.stringify(data)) + apiKey);
        console.log({ data });
        const response = await axios.post(endPoint, data, {
          headers: {
            merchant,
            sign,
          },
        });
        return response.data.result.url;
      }
    }
    return null;
  } catch (error) {
    console.error("Error creating order and order products:", error);
    throw error;
  }
}

// {
//   "id": "clvi0a9ab000jgpy0opv0176g",
//   "userId": "clvhp7aqa000oe5v1yzsycmov",
//   "createdAt": "2024-04-27T11:16:08.195Z",
//   "totalPrice": 70323,
//   "totalDiscount": 12206,
//   "status": "Pending",
//   "products": [
//       {
//           "id": "clvi0a9ab000kgpy0se7ohyeh",
//           "orderId": "clvi0a9ab000jgpy0opv0176g",
//           "productId": "clvav9q8e000vogbdgwo0tf11",
//           "quantity": 1
//       },
//       {
//           "id": "clvi0a9ab000lgpy0u9xs61pj",
//           "orderId": "clvi0a9ab000jgpy0opv0176g",
//           "productId": "clvavcw2k000xogbdflgfyndx",
//           "quantity": 1
//       },
//       {
//           "id": "clvi0a9ab000mgpy0ql61hp9n",
//           "orderId": "clvi0a9ab000jgpy0opv0176g",
//           "productId": "clvax70hl001logbd8427ckie",
//           "quantity": 1
//       },
//       {
//           "id": "clvi0a9ab000ngpy0en3gsrid",
//           "orderId": "clvi0a9ab000jgpy0opv0176g",
//           "productId": "clvavtu8f0017ogbdqw1xprj1",
//           "quantity": 1
//       }
//   ]
// }
