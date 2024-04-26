"use client";
import { SingleProduct } from "@/components/user";
import { getProductFromId } from "@/data/product";
import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";
import { useEffect, useState } from "react";

interface SingleProductPageProps {
  params: {
    productId: string;
  };
}

const SingleProductPage = ({ params }: SingleProductPageProps) => {
  const {setProduct} = useAppStore()

  useEffect(() => {
    (async function getProduct() {
      const response = await getProductFromId(params.productId) as ProductTypes;
      if (response) {
        setProduct(response);
      }
    })();
  }, [params.productId, setProduct]);
  return (
    <div>
      <SingleProduct  />
    </div>
  );
};

export default SingleProductPage;
