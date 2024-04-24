"use client";
import { SearchProducts, SingleProduct } from "@/components/user";
import { getProductFromId } from "@/data/product";
import { Products } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProductsByTagAction } from "@/actions/search-product-by-tag-action";

const SearchPage = () => {
  const [product, setProduct] = useState<Products[]|[]>([]);
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

    useEffect(() => {
      (async function getProduct() {
        if(tag) {
          const response = await searchProductsByTagAction(tag);
          if (response) {
            setProduct(response);
          }
        }
      })();
    }, [tag]);
  return (
    <div>
      {/* <SingleProduct product={product} /> */}
      <SearchProducts products={product}/>
    </div>
  );
};

export default SearchPage;
