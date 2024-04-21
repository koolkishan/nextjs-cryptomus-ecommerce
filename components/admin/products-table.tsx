"use client";
import { DataTable } from ".";
import { useEffect, useState } from "react";
import { getProductByLimit } from "@/actions/get-products-by-limit";
import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";

const ProductsTable = () => {
  // const [productsData, setProductsData] = useState<ProductTypes[] | []>([]);
  const { productsData, setProductsData } = useAppStore();
  console.log("ProductsTable ~ products:", productsData);
  useEffect(() => {
    async function getProducts() {
      const response = await getProductByLimit(20);
      console.log("getProducts ~ response:", response);
      if (response && response.length > 0) {
        // @ts-ignore
        setProductsData(response);
      }
    }
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return productsData && <DataTable products={true} orders={[]} />;
};

export default ProductsTable;
