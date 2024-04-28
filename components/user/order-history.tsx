"use client";

import { orderTypes } from "@/types";
import Order from "./order"; // Assuming you have an Order component to render individual orders
import { useEffect } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";

interface OrderHistoryProps {
  orders: orderTypes[] | [];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const user = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  return (
    <div className="lg:container lg:px-0 px-6">
      {orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      )}
      {orders.length === 0 && <p>No orders available.</p>}
    </div>
  );
};

export default OrderHistory;
