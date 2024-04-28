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
  // searchProducts,
}: FilterProductsProps) => {
  const {
    allCategories,
    categoryProducts,
    setCategoryProducts,
    filterProducts,
    setFilterProducts,
    searchProducts
  } = useAppStore();
  const [sortBy, setSortBy] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [selectCategoryId, setSelectedCategoryId] = useState<string>("");
  const deBouncePriceRange = useDebounce(priceRange.join(","), 200);

  useEffect(() => {
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    if (categoryFilter) {
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
    }
  }, [categoryFilter, categoryProducts, searchFilter]);

  useEffect(() => {
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    if (searchFilter && searchProducts) {
      searchProducts.forEach((product) => {
        if (product.price > max) {
          max = product.price;
        }
        if (product.price < min) {
          min = product.price;
        }
      });
      setMaxPrice(max);
      setMinPrice(min);
    }
  }, [searchFilter, searchProducts]);
  const sortingOptions = [
    { label: "Lowest first", value: "lowToHigh" },
    { label: "Higest first", value: "highToLow" },
  ];

  const handleCategoryChange = (categoryName: string) => {
    // setSelectedCategory(categoryName);
    const selectedCategory = allCategories.find(
      (category) => category.categoryName === categoryName
    );
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory.id);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleChange = (e: any) => {
    setPriceRange([e[0], e[1]]);
  };

  // const handleFilter = async () => {
  //   if (deBouncePriceRange) {
  //     const [debounceMinPrice, debounceMaxPrice] =
  //       deBouncePriceRange.split(",");

  //     let filteredProducts;
  //     // = categoryProducts.filter((product) => {
  //     //   const price = product.price;
  //     //   return (
  //     //     price >= parseInt(debounceMinPrice) &&
  //     //     price <= parseInt(debounceMaxPrice)
  //     //   );
  //     // });
  //     // setFilterProducts(filteredProducts);
  //     if (categoryFilter) {
  //       filteredProducts = categoryProducts.filter((product) => {
  //         const price = product.price;
  //         return (
  //           price >= parseInt(debounceMinPrice) &&
  //           price <= parseInt(debounceMaxPrice)
  //         );
  //       });
  //       setFilterProducts(filteredProducts);
  //     }
  //     if (searchFilter && searchProducts) {
  //       filteredProducts = searchProducts.filter((product) => {
  //         const price = product.price;
  //         return (
  //           price >= parseInt(debounceMinPrice) &&
  //           price <= parseInt(debounceMaxPrice)
  //         );
  //       });
  //       setFilterProducts(filteredProducts);
  //     }
  //     if (sortBy === "highToLow" && filteredProducts) {
  //       setFilterProducts(filteredProducts.sort((a, b) => b.price - a.price));
  //     } else if (sortBy === "lowToHigh" && filteredProducts) {
  //       setFilterProducts(filteredProducts.sort((a, b) => a.price - b.price));
  //     }
  //   }
  //   if (sortBy === "highToLow") {
  //     if (searchFilter && searchProducts) {
  //       setFilterProducts(searchProducts.sort((a, b) => b.price - a.price));
  //     } else {
  //       setFilterProducts(categoryProducts.sort((a, b) => b.price - a.price));
  //     }
  //   }
  //   if (sortBy === "lowToHigh") {
  //     if (searchFilter && searchProducts) {
  //       setFilterProducts(searchProducts.sort((a, b) => a.price - b.price));
  //     } else {
  //       setFilterProducts(categoryProducts.sort((a, b) => a.price - b.price));
  //     }
  //   }
  // };

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
      // if (searchFilter && searchProducts) {
      //   // Filter by category name if selected
      //   if (selectCategoryId) {
      //     filteredProducts = searchProducts.filter((product) => {
      //       return (
      //         product.categoryId === selectCategoryId &&
      //         product.price >= parseInt(debounceMinPrice) &&
      //         product.price <= parseInt(debounceMaxPrice)
      //       );
      //     });
      //   } else {
      //     // Filter only by price range if no category is selected
      //     filteredProducts = searchProducts.filter((product) => {
      //       return (
      //         product.price >= parseInt(debounceMinPrice) &&
      //         product.price <= parseInt(debounceMaxPrice)
      //       );
      //     });
      //   }
      // }
    }

    if (sortBy === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }
    setFilterProducts(filteredProducts);
  };

  return (
    <div className="bg-secondary-white rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)] mt-4">
      <div className="grid grid-rows-4 gap-6 px-4 py-2">
        {/* {!categoryFilter && (
          <div className="">
            <Select
              onValueChange={handleCategoryChange}
              defaultValue={categoryName}
            >
              <SelectTrigger className="w-[280px] ring-0 ring-offset-0 focus:ring-0">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className=" ">
                {allCategories.map((category) => (
                  <SelectItem
                    key={category.id}
                    className="focus:text-secondary-blue"
                    value={category.categoryName}
                    onClick={() => handleCategoryChange(category.categoryName)}
                    defaultChecked={true}
                  >
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )} */}
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
        className={cn("px-6", categoryFilter ? "mt-[-180px]" : "mt-[-180px]")}
      >
        <p className="">Prices</p>
        <Slider
          range
          min={minPrice}
          max={maxPrice}
          allowCross={false}
          defaultValue={[0, 30]}
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
              {deBouncePriceRange ? deBouncePriceRange.split(",")[0] : minPrice}
            </p>
          </div>
          <div>
            <p>Max</p>
            <p className="text-secondary-gray">
              $
              {deBouncePriceRange ? deBouncePriceRange.split(",")[1] : maxPrice}
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
