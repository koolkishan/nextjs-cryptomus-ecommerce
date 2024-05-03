"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllOrderAction } from "@/actions/get-all-orders";
import { CtegoryWithProduct, orderTypes } from "@/types";
import PieChart from "./pie-chart";
import { getAllCategoriesWithProduct } from "@/actions/get-all-categories-with-product-count";
import BarChart from "./bar-chart";
import { OrderTable } from "./order-table";
import { getTotalIncomeAndDeliveredOrder } from "@/lib/utils";
import { LuCircleDollarSign } from "react-icons/lu";
import { BsBarChartFill } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";
import { useAppStore } from "@/store";

const DashBoard = () => {
  const [allCategoryWithProduct, setAllCategoryWithProduct] = useState<
    CtegoryWithProduct[] | []
  >([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const {orders, setOrders} = useAppStore();

  useEffect(()=>{
    const { income, deliveredOrder, uniqueCustomers } = getTotalIncomeAndDeliveredOrder(orders);
        setTotalIncome(income);
        setTotalSales(deliveredOrder);
        setTotalCustomers(uniqueCustomers.length)
  },[orders])

  useEffect(() => {
    async function getAllOrders() {
      const allOrdersDetails = await getAllOrderAction();
      if (allOrdersDetails) {
        setOrders(allOrdersDetails);
      }
      const categoryAndProducts = await getAllCategoriesWithProduct();
      if (categoryAndProducts){
        setAllCategoryWithProduct(categoryAndProducts);
      } 
    }
    getAllOrders();
  }, [setOrders]);

  return (
    <div className="text-primary-text mx-5">
      <div className="text-2xl font-medium my-4">
        <p>Overview</p>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-10 ">
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Income</p>
            <p className="sm:text-4xl">${totalIncome.toLocaleString("us")}</p>
          </div>
          <div className="py-3 flex items-center h-full">
            {/* <Image
              src="/Dollar.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
              loading="lazy"
            /> */}
            <div className="p-3 rounded-2xl bg-blue-400/10">
              <LuCircleDollarSign size={50} className="text-secondary-blue " />
            </div>
          </div>
        </div>
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Sales</p>
            <p className="sm:text-4xl">{totalSales.toLocaleString("us")}</p>
          </div>
          <div className="py-3 flex items-center h-full">
            {/* <Image
              src="/sales.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
              loading="lazy"
            /> */}
            <div className="p-3 rounded-2xl bg-blue-400/10">
              <BsBarChartFill size={50} className="text-secondary-blue " />
            </div>
          </div>
        </div>
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Customer</p>
            <p className="sm:text-4xl">{totalCustomers}</p>
          </div>
          <div className="py-3 flex items-center h-full">
            {/* <Image
              src="/customer.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
              loading="lazy"
            /> */}
            <div className="p-3 rounded-2xl bg-blue-400/10">
              <RiUser3Fill size={50} className="text-secondary-blue " />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className="w-1/2">
          <PieChart orders={orders} />
        </div>
        <div className="w-1/2">
          <BarChart allCategoryWithProduct={allCategoryWithProduct} />
        </div>
      </div>
      <div className=" font-medium my-4">
        <p className="text-2xl">Last Five Orders</p>
        <OrderTable lastFiveOrders={true} orders={orders.slice(0, 5)} />
      </div>
    </div>
  );
};

export default DashBoard;
