"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
// import e from 'react-slider'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import _debounce from "lodash/debounce";
import { ProductTypes } from "@/types";
import { Button } from "../ui/button";
import { getCategoryProductFromName } from "@/actions/get-category-product-from-name";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

interface FilterProductsProps {
  categoryFilter: boolean;
  searchFilter: boolean;
  categoryName?: string | "";
  searchProducts?: ProductTypes[];
}

const FilterProducts = ({
  categoryName,
  categoryFilter,
  searchFilter,
}: // searchProducts,
FilterProductsProps) => {
  console.log("searchFilter in search :", searchFilter);
  const { categoryProducts, setFilterProducts, searchProducts } = useAppStore();
  console.log("searchProducts in search:", searchProducts);
  const [sortBy, setSortBy] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [isMinMaxPrice, setIsMinMaxPrice] = useState<boolean>(false);
  // const [selectCategoryId, setSelectedCategoryId] = useState<string>("");
  const deBouncePriceRange = useDebounce(priceRange.join(","), 200);

  useEffect(() => {
    if (categoryFilter && categoryProducts) {
      setIsMinMaxPrice(false);
      let max = 0;
      // console.log('useEffect category ~ max:', max)
      let min = 0;
      // console.log('useEffect category ~ min:', min)
      categoryProducts.forEach((product) => {
        if (product.price > max) {
          max = product.price;
        }
        if (product.price < min) {
          min = product.price;
        }
      });
      setMaxPrice(max);
      setMinPrice(min);
      setIsMinMaxPrice(true)
    }
  }, [categoryFilter, categoryProducts]);

  useEffect(() => {
    console.log("useEffect search ~ searchFilter:", searchFilter);
    if (searchFilter && searchProducts.length) {
      setIsMinMaxPrice(false);

      let max = 0;
      let min = 0;
      console.log("searchProducts.forEach search~ max:", max);
      console.log("searchProducts.forEach search ~ min:", min);
      searchProducts.forEach((product) => {
        if (product.price > max) {
          console.log(
            "searchProducts.forEach ~ product.price: in max",
            product.price
          );
          max = product.price;
        }
        if (product.price < min) {
          console.log("searchProducts.forEach ~ product.price:", product.price);
          min = product.price;
        }
      });
      setMaxPrice(max);
      setMinPrice(min);
      setIsMinMaxPrice(true);

    }
  }, [searchFilter, searchProducts]);
  const sortingOptions = [
    { label: "Lowest first", value: "lowToHigh" },
    { label: "Higest first", value: "highToLow" },
  ];

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleChange = (e: any) => {
    setPriceRange([e[0], e[1]]);
  };

  const handleFilter = async () => {
    let filteredProducts: ProductTypes[] | [] = [];

    if (deBouncePriceRange) {
      const [debounceMinPrice, debounceMaxPrice] =
        deBouncePriceRange.split(",");

      if (categoryFilter) {
        filteredProducts = categoryProducts.filter((product) => {
          const price = product.price;
          return (
            price >= parseInt(debounceMinPrice) &&
            price <= parseInt(debounceMaxPrice)
          );
        });
      }
      if (searchFilter && searchProducts) {
        filteredProducts = searchProducts.filter((product) => {
          const price = product.price;
          return (
            price >= parseInt(debounceMinPrice) &&
            price <= parseInt(debounceMaxPrice)
          );
        });
      }
    }

    if (sortBy === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }
    setFilterProducts(filteredProducts);
  };

  return (
   
    isMinMaxPrice &&  <div className="bg-secondary-white rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)] mt-4">
    <div className="grid grid-rows-4 gap-6 px-4 py-2">
      <div className="">
        <Select onValueChange={handleSortChange} defaultValue="">
          <SelectTrigger className="w-[280px] ring-0 ring-offset-0 focus:ring-0">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="">
            {sortingOptions.map((option) => (
              <SelectItem
                key={option.value}
                className="hover:bg-surface focus:text-secondary-blue"
                value={option.value}
                onClick={() => handleSortChange(option.value)}
                defaultChecked={true}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
        <div
          className={cn(
            "px-6",
            categoryFilter ? "mt-[-180px]" : "mt-[-180px]"
          )}
        >
          <p className="">Prices</p>
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            allowCross={false}
            defaultValue={[minPrice, maxPrice]}
            onChange={handleChange}
            className="my-4 "
            trackStyle={[
              { backgroundColor: "#0090ff" },
              { backgroundColor: "#0090ff" },
            ]}
            handleStyle={[
              { backgroundColor: "#0090ff" },
              { backgroundColor: "#0090ff" },
            ]}
          />
          <div className="flex justify-between ">
            <div>
              <p>Min</p>
              <p className="text-secondary-gray">
                $
                {deBouncePriceRange
                  ? deBouncePriceRange.split(",")[0]
                  : minPrice}
              </p>
            </div>
            <div>
              <p>Max</p>
              <p className="text-secondary-gray">
                $
                {deBouncePriceRange
                  ? deBouncePriceRange.split(",")[1]
                  : maxPrice}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="bg-white hover:bg-bg-white border-secondary-blue text-secondary-blue px-10 my-4 ml-6"
            onClick={handleFilter}
          >
            Apply
          </Button>
        </div>
  </div>
   
  );
};

export default FilterProducts;
