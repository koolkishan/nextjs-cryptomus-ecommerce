"use client";

import Image from "next/image";
import * as Highcharts from "highcharts";
import { useEffect, useState } from "react";
import { getAllOrderAction } from "@/actions/get-all-orders";
import {
  CategoryWithProductCount,
  CtegoryWithProduct,
  orderTypes,
} from "@/types";
import PieChart from "./pie-chart";
import { getAllCategoriesWithProduct } from "@/actions/get-all-categories-with-product-count";
import BarChart from "./bar-chart";
import { OrderTable } from "./order-table";

const DashBoard = () => {
  const [allOrders, setAllOrders] = useState<orderTypes[] | []>([]);
  const [allCategoryWithProduct, setAllCategoryWithProduct] = useState<
    CtegoryWithProduct[] | []
  >([]);
  console.log("DashBoard ~ allCategoryWithProduct:", allCategoryWithProduct);
  useEffect(() => {
    async function getAllReader() {
      const allOrdersDetails = await getAllOrderAction();
      if (allOrdersDetails) {
        setAllOrders(allOrdersDetails);
      }
      const categoryAndProducts = await getAllCategoriesWithProduct();
      if (categoryAndProducts) setAllCategoryWithProduct(categoryAndProducts);
    }
    getAllReader();
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
            <p className="sm:text-4xl">$8.500</p>
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
            <p className="sm:text-4xl">$8.500</p>
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
            <p className="sm:text-4xl">$8.500</p>
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
