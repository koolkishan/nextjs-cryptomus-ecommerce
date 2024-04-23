"use client";
import { useAppStore } from "@/store";
import HorizontalProductList from "./horizontal-product-list";

const NewProduct = () => {
  const { userProductsData } = useAppStore();
  return (
    <div className=" px-6 lg:px-0 lg:container">
      <p className="text-2xl font-medium my-4">New Products</p>
      <HorizontalProductList products={userProductsData.slice(0, 8)} />
    </div>
  );
};

export default NewProduct;
