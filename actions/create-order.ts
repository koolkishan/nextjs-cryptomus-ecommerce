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
          orderStatus: "pending",
          paymentStatus: "Pending",
        },
        include: {
          products: true,
        },
      });
      if (order) {
        const endPoint = "https://api.cryptomus.com/v1/payment";
        const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
        const amount = Math.round(order.totalPrice) - Math.round(order.totalDiscount);
        const data = {
          currency: "USD",
          amount: amount.toString() + ".00",
          order_id: order.id.toString(),
          lifetime: 300,
          url_callback: "https://ccce-2409-4080-8606-9c27-8072-fbf-9b3f-dd9.ngrok-free.app/callback?id=" + order.id,  //  Add your ngrock webhook localhost not work 
          url_return: `http://localhost:3000`,
          // url_return: `https://nextjs-cryptomus-ecommerce.vercel.app`,
          // url_callback: "https://1139-165-225-120-150.ngrok-free.app/callback?id=" + order.id, 
        };
        const merchant = process.env.CRYPTOMUS_MERCHANT_ID as string;
        const sign = md5(btoa(JSON.stringify(data)) + apiKey);
        console.log('create order data:--',{ data });
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
