import React from "react";
import FilterProducts from "./filter-products";
import VerticalProductList from "./vertical-product-list";
interface SearchProductsProps {
  tag: string;
}

const SearchProducts = ({ tag }: SearchProductsProps) => {
  return (
    <div>
      <div className=" flex-1 w-full overflow-auto">
        <div className="lg:container lg:px-0  px-6 grid grid-cols-4">
          <div className="col-span-1  h-full sticky ">
            <FilterProducts
              categoryFilter={false}
              searchFilter={true}
            />
          </div>
          <div className="w-full right-0 col-span-3 h-full">
            <VerticalProductList
              categoryFilter={false}
              searchFilter={true}
              tag={tag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
