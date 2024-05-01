"use client";
import { useAppStore } from "@/store";
import HorizontalProductList from "./horizontal-product-list";
import ContainerLoader from "../loader";

const NewProduct = () => {
  const { userProductsData } = useAppStore();
  return (
    <>
      {userProductsData && userProductsData.length > 0 ? (
        <div className="px-6 lg:px-0 lg:container">
          <HorizontalProductList products={userProductsData.slice(0, 8)} />
        </div>
      ) : (
        <div className="h-[230px] flex justify-center items-center">
          <ContainerLoader />
        </div>
      )}
    </>
  );
};

export default NewProduct;
