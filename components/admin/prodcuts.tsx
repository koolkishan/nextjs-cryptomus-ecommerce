"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AddProductSideBar } from "./add-product-sidebar";
import ProductsTable from "./products-table";
import { FiPlus } from "react-icons/fi";

const Products = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="text-primary-text w-full">
      <div className="text-2xl w-full flex justify-center items-center font-medium mt-4">
        <p className="flex-1">Products</p>
        
        <AddProductSideBar />
      </div>
      <div className="">
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;
