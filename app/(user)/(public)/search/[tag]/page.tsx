"use client";
import { SearchProducts, SingleProduct } from "@/components/user";
import { getProductFromId } from "@/data/product";
import { Products } from "@prisma/client";
import { useEffect, useState } from "react";
import { searchProductsByTagAction } from "@/actions/search-product-by-tag-action";
import { Suspense } from "react";
import { ProductTypes } from "@/types";
import { useAppStore } from "@/store";

interface SearchPageProps {
  params: {
    tag: string;
  };
}

const SearchPage = ({params}:SearchPageProps) => {
  // const {setSearchProducts, searchProducts} = useAppStore()
  const tag = decodeURIComponent(params.tag);
  return (
    <Suspense>
      <div>
        <SearchProducts  tag={tag}/>
      </div>
    </Suspense>
  );
};

export default SearchPage;
