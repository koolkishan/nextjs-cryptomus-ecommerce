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

const DashBoard = () => {
  const [allOrders, setAllOrders] = useState<orderTypes[] | []>([]);
  const [allCategoryWithProduct, setAllCategoryWithProduct] = useState<
    CtegoryWithProduct[] | []
  >([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  useEffect(() => {
    async function getAllOrders() {
      const allOrdersDetails = await getAllOrderAction();
      console.log("getAllOrders ~ allOrdersDetails:", allOrdersDetails);
      if (allOrdersDetails) {
        setAllOrders(allOrdersDetails);
        const { income, deliveredOrder, uniqueCustomers } = getTotalIncomeAndDeliveredOrder(allOrdersDetails);
        setTotalIncome(income);
        setTotalSales(deliveredOrder);
        setTotalCustomers(uniqueCustomers.length)
      }
      const categoryAndProducts = await getAllCategoriesWithProduct();
      if (categoryAndProducts) setAllCategoryWithProduct(categoryAndProducts);
    }
    getAllOrders();
  }, []);

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
          <div className="py-5 lg:py-0">
            <Image
              src="/Dollar.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
        </div>
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Sales</p>
            <p className="sm:text-4xl">{totalSales.toLocaleString("us")}</p>
          </div>
          <div className="py-5 lg:py-0">
            <Image
              src="/sales.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
        </div>
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Customer</p>
            <p className="sm:text-4xl">{totalCustomers}</p>
          </div>
          <div className="py-5 lg:py-0">
            <Image
              src="/customer.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className="w-1/2">
          <PieChart orders={allOrders} />
        </div>
        <div className="w-1/2">
          <BarChart allCategoryWithProduct={allCategoryWithProduct} />
        </div>
      </div>
      <div className="text-2xl font-medium my-4">
        <p>Last Five Orders</p>
        <OrderTable orders={allOrders.slice(0, 5)} />
      </div>
    </div>
  );
};

export default DashBoard;
