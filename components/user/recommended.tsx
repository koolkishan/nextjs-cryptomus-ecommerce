import { useAppStore } from "@/store";
import HorizontalProductList from "./horizontal-product-list";
import { ProductTypes } from "@/types";
import { useEffect, useState } from "react";
import { getProductFromCategoryId } from "@/actions/get-products-from-category-id";

interface RecommendedProductsProps {
  productsForSameCategory?: boolean;
  categoryId?: string;
}

const RecommendedProducts = ({
  productsForSameCategory = false,
  categoryId = "",
}: RecommendedProductsProps) => {
  const { userProductsData } = useAppStore();
  // const [categoryProduct, setCategoryProduct] = useState<ProductTypes[]>([]);

  // useEffect(() => {
  //   async function fetchCategoryProducts() {
  //     if (productsForSameCategory && categoryId) {
  //       try {
  //         const response = await getProductFromCategoryId(categoryId);
  //         setCategoryProduct(response);
  //       } catch (error) {
  //         console.error("Error fetching category products:", error);
  //       }
  //     }
  //   }

  //   fetchCategoryProducts();
  // }, [categoryId]);

  let productsToDisplay: ProductTypes[] = [];

    const productsByCategory: { [key: string]: ProductTypes } = {};
    userProductsData.forEach((product: ProductTypes) => {
      if (!productsByCategory[product.categoryId]) {
        productsByCategory[product.categoryId] = product;
      }
    });
    productsToDisplay = Object.values(productsByCategory);

  return (
    <div className="px-6 lg:px-0 lg:container">
      <p className="text-2xl font-medium my-4">Recommended</p>
      <HorizontalProductList products={productsToDisplay.slice(0, 4)} />
    </div>
  );
};

export default RecommendedProducts;
