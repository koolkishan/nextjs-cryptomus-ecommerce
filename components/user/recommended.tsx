import { useAppStore } from "@/store";
import HorizontalProductList from "./horizontal-product-list";
import { ProductTypes } from "@/types";
import { useEffect, useState } from "react";
import { getProductFromCategoryId } from "@/actions/get-products-from-category-id";
import ContainerLoader from "../loader";

interface RecommendedProductsProps {
  productsForSameCategory?: boolean;
  categoryId?: string;
}

const RecommendedProducts = ({
  productsForSameCategory = false,
  categoryId = "",
}: RecommendedProductsProps) => {
  const { userProductsData } = useAppStore();

  let productsToDisplay: ProductTypes[] = [];

  const productsByCategory: { [key: string]: ProductTypes } = {};
  userProductsData.forEach((product: ProductTypes) => {
    if (!productsByCategory[product.categoryId]) {
      productsByCategory[product.categoryId] = product;
    }
  });
  productsToDisplay = Object.values(productsByCategory);

  return (
    <>
      {productsToDisplay && productsToDisplay.length > 0 ? (
        <div className="px-6 lg:px-0 lg:container">
          <HorizontalProductList products={productsToDisplay.slice(0, 4)} />
        </div>
      ) : (
        <div className="h-[230px] flex justify-center items-center">
          <ContainerLoader />
        </div>
      )}
    </>
  );
};

export default RecommendedProducts;
