"use client";

import { getOrderProductAction } from "@/actions/get-order-products";
import { useEffect } from "react";

interface OrderProps {
  orderId: string;
}
const Order = ({ orderId }: OrderProps) => {
  useEffect(() => {
    async function fetchOrderProduct() {
      const result = await getOrderProductAction(orderId);
      console.info(result, "____");
    }
    fetchOrderProduct();
  }, [orderId]);
  return <div>checkOut Page</div>;
};

export default Order;
