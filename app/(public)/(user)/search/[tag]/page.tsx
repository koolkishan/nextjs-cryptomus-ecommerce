"use client";
import { SearchProducts, SingleProduct } from "@/components/user";
import { getProductFromId } from "@/data/product";
import { Products } from "@prisma/client";
import { useEffect, useState } from "react";
import { searchProductsByTagAction } from "@/actions/search-product-by-tag-action";
import { Suspense } from "react";

interface SearchPageProps {
  params: {
    tag: string;
  };
}

const SearchPage = ({params}:SearchPageProps) => {
  const [product, setProduct] = useState<Products[] | []>([]);
  const tag = decodeURIComponent(params.tag);

  useEffect(() => {
    (async function getProduct() {
      if (tag) {
        const response = await searchProductsByTagAction(tag);
        if (response) {
          setProduct(response);
        }
      }
    })();
  }, [tag]);
  return (
    <Suspense>
      <div>
        <SearchProducts products={product} />
      </div>
    </Suspense>
  );
};

export default SearchPage;
