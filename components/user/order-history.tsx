"use client";

import { orderTypes } from "@/types";
import Order from "./order";
import { useEffect, useState } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import ContainerLoader from "../loader";

interface OrderHistoryProps {
  orders: orderTypes[] | [];
  loader: boolean;
}

const OrderHistory = ({ loader, orders }: OrderHistoryProps) => {
  const user = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  return (
    <div className="lg:container lg:px-0 px-6">
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="h-[230px] w-full flex justify-center items-center">
          {loader ? (
            <ContainerLoader />
          ) : (
            <div>
              <p>{`You dont't have any order history`}</p>
            </div>
          )}
        </div>
      )}
    </div>
    // {orders.length === 0 && <p>No orders available.</p>}
  );
};

export default OrderHistory;
