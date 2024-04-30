"use client";
import { DataTable } from ".";
import { useEffect, useState } from "react";
// import { getProductByLimit } from "@/actions/get-products-by-limit";
import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";
import { getProducts } from "@/actions/get-products";

const ProductsTable = () => {
  // const [productsData, setProductsData] = useState<ProductTypes[] | []>([]);
  const { productsData, setProductsData } = useAppStore();
  useEffect(() => {
    async function getDbProducts() {
      const response = await getProducts();
      if (response && response.length > 0) {
        // @ts-ignore
        setProductsData(response);
      }
    }
    getDbProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return  <DataTable products={true}  />;
};

export default ProductsTable;
