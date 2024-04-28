import { Products } from "@prisma/client";
import React from "react";
import FilterProducts from "./filter-products";
import VerticalProductList from "./vertical-product-list";
import { ProductTypes } from "@/types";
interface SearchProductsProps {
  // products: ProductTypes[];
  tag: string;
}

const SearchProducts = ({ tag }: SearchProductsProps) => {
  return (
    <div>
      <div className=" flex-1 w-full overflow-auto">
        {/* <div className=" lg:container lg:px-0 px-6">
          <div className="fixed px-6 lg:container lg:px-0 bg-blue-100 w-full p-4">
            <p className="text-2xl lg:text-4xl px-2 font-medium">
              Search Result
            </p>
          </div>
        </div> */}
        <div className="lg:container lg:px-0  px-6 grid grid-cols-4">
          <div className="col-span-1  h-full sticky ">
            <FilterProducts
              // searchProducts={products}
              categoryFilter={false}
              searchFilter={true}
              
            />
          </div>
          <div className="w-full right-0 col-span-3 h-full">
            <VerticalProductList
              categoryFilter={false}
              searchFilter={true}
              // searchProducts={products}
              tag={tag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
