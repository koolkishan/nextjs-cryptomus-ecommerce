"use client";
import { SingleProduct } from "@/components/user";
import { getProductFromId } from "@/data/product";
import { Products } from "@prisma/client";
import { useEffect, useState } from "react";

interface SingleProductPageProps {
  params: {
    productId: string;
  };
}

const SingleProductPage = ({ params }: SingleProductPageProps) => {
  const [product, setProduct] = useState<Products>();

  useEffect(() => {
    (async function getProduct() {
      const response = await getProductFromId(params.productId);
      if (response) {
        setProduct(response);
      }
    })();
  }, [params.productId]);
  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
};

export default SingleProductPage;
