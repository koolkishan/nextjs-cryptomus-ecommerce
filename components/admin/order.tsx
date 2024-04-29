"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AddProductSideBar } from "./add-product-sidebar";
import ProductsTable from "./products-table";
import { FiPlus } from "react-icons/fi";
import { useAppStore } from "@/store";
import { getCategories } from "@/actions/get-all-categories";
import { OrderTable } from "./order-table";
import { getAllOrderAction } from "@/actions/get-all-orders";
import { orderTypes } from "@/types";

const Order = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
// const [orders, setOrder] = useState<orderTypes[] | []>([]);
const {setOrders, orders} = useAppStore()  
useEffect(() => {
    setIsMounted(true);
    async function fetchOrders() {
      const response = await getAllOrderAction();
      if(response && response.length>0) {
        setOrders(response);
      }
    }
    fetchOrders();
  }, [setOrders]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="text-primary-text w-full">
      <div className="text-2xl w-full flex justify-center items-center font-medium mt-4">
        <p className="flex-1">Orders</p>
      </div>
      <div className="">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default Order;
