"use client";
import { getOrderProductAction } from "@/actions/get-order";
import { OrderHistory } from "@/components/user";
import { useAuthUser } from "@/hooks/useAuthUser";
import { orderTypes } from "@/types";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const user = useAuthUser();
  const [orders, setOrders] = useState<orderTypes[] | []>([]);
  useEffect(() => {
    async function getOrder() {
      if (user && user.email) {
        const response = await getOrderProductAction(user.email);
        if (response && response.length>0) {
          setOrders(response);
        }
      }
    }
    getOrder();
  }, [user]);
  return (
    <div>
      <OrderHistory orders={orders}/>
      {/* <h1>order page</h1> */}
    </div>
  );
};

export default OrderPage;
