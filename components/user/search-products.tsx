import { Products } from "@prisma/client";
import React from "react";
import FilterProducts from "./filter-products";
import VerticalProductList from "./vertical-product-list";
interface SearchProductsProps {
  products: Products[];
}

const SearchProducts = ({ products }: SearchProductsProps) => {
  return (
    <div>
      <div className="lg:container lg:px-0 px-6 flex-1 w-full overflow-auto">
        <div className=" fixed bg-blue-100 w-full  p-4">
          <div className="">
            <p className="text-2xl lg:text-4xl font-medium">
              {/* {category?.categoryName} */}
              Search Result
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 pt-[92px]">
          <div className="col-span-1  h-full sticky ">
            <div className="fixed mt-4">
              <FilterProducts
                searchProducts={products}
                categoryFilter={false}
                searchFilter={true}
              />
            </div>
          </div>
          <div className="w-full right-0 col-span-3 h-full">
            <VerticalProductList
              categoryFilter={false}
              searchFilter={true}
              searchProducts={products}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
