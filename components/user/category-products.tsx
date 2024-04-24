"use client";

import { useAppStore } from "@/store";
import { Products } from "@prisma/client";

interface CategoryProductsProps {
  products: Products[];
}
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import VerticalProductList from "./vertical-product-list";
import FilterProducts from "./filter-products";

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const {
    allCategories,
    setCategoryProducts,
    setFilterProducts,
  } = useAppStore();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setFilterProducts([]);
    setCategoryProducts(products);
    
  }, [products, setCategoryProducts]);

  useEffect(() => {
    setIsMounted(true);
    // async function callOnce() {
    //   await register();
    // }
    // callOnce();
    const category = allCategories.find((c) => c.id === products[0].categoryId);
    if (category) {
      // setSelectedCategory(category.categoryName);
    }
  }, []);

  if (!isMounted) {
    return null;
  }
  const category = allCategories.find((c) => c.id === products[0].categoryId);

  return (
    <div className="px-6   lg:px-0 h-full flex">
      <div className=" fixed bg-blue-100 w-full  p-4">
        <div className="lg:container lg:px-0 px-6">
          <p className="text-2xl lg:text-4xl font-bold">
            {category?.categoryName}
          </p>
          <Breadcrumb className="hidden md:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-secondary-blue">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-secondary-blue">
                  Category
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category?.categoryName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="lg:container lg:px-0 px-6 flex-1 w-full overflow-auto">
        <div className="grid grid-cols-4 pt-[92px]">
          <div className="col-span-1  h-full sticky ">
            <div className="fixed mt-4">
              <FilterProducts
                categoryName={category?.categoryName || ""}
                categoryFilter={true}
                searchFilter={false}
              />
            </div>
          </div>
          <div className="w-full right-0 col-span-3 h-full">
            <VerticalProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
