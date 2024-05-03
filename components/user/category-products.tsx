"use client";
import { useAppStore } from "@/store";
interface CategoryProductsProps {
  products: ProductTypes[];
  categoryid: string;
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
import { CategoryTypes, ProductTypes } from "@/types";
import { getCategoryFromDb } from "@/data/category";
import Image from "next/image";

const CategoryProducts = ({ categoryid, products }: CategoryProductsProps) => {
  const { allCategories, setCategoryProducts, setFilterProducts } =
    useAppStore();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryTypes>();
  useEffect(() => {
    setFilterProducts([]);
    setCategoryProducts(products);
  }, [products, setCategoryProducts, setFilterProducts]);

  useEffect(() => {
    setIsMounted(true);
    (async () => {
      const category = await getCategoryFromDb(categoryid);
      console.log("category:", category);
      if (category) {
        setCategory(category);
      }
    })();
  }, [categoryid]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* {products.length > 0 ? ( */}
      <div className="px-6 h-full lg:px-0 flex ">
        <div className=" fixed z-[40] bg-blue-100 w-full  p-4">
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
        {products.length > 0 && (
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
                <VerticalProductList
                  categoryFilter={true}
                  searchFilter={false}
                />
              </div>
            </div>
          </div>
        )}
        {
          products.length === 0 && (
            <div className="bg-red-600px flex w-full min-h-[calc(100vh-194px)] pt-[92px] text-center justify-center items-center">
              <div className="relative w-[900px] h-[500px]">
                <Image
                src='/no-product-found.png'
                layout="fill"
                objectFit="contain"
                alt='not products found'
                />
              </div>
            </div>
          )
        }
      </div>
          
        
    </>
  );
};

export default CategoryProducts;
