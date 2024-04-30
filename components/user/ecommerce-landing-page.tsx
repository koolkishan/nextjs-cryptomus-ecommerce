"use client";
import Image from "next/image";
import { useEffect } from "react";
import { getProducts } from "@/actions/get-products";
import { useAppStore } from "@/store";
import NewProduct from "./new-products";
import RecomendedProducts from "./recommended";
import { Button } from "../ui/button";
import Categories from "./categories";
import { getCategories } from "@/actions/get-all-categories";

const EcommerceLandingPage = () => {
  const { userProductsData, setUserProductsData, setAllCategories } =
    useAppStore();

  useEffect(() => {
    async function getProductsData() {
      const productResponse = await getProducts();
      if (productResponse && productResponse.length > 0) {
        setUserProductsData(productResponse);
      }
      const categoryResponse = await getCategories();
      if (categoryResponse && categoryResponse.length > 0) {
        setAllCategories(categoryResponse);
      }
    }
    getProductsData();
  }, [setUserProductsData, setAllCategories]);

  return (
    <div className="lg:container lg:px-0 px-6">
      {userProductsData.length > 0 && (
        <div>
          <div className="w-full">
            <Image
              src="/best-deal.png"
              alt="best deal"
              className="w-full h-[350px] cursor-pointer"
              width={500}
              height={150}
              loading="lazy"
            />
          </div>
          <Categories />
          <NewProduct />
          <div className="flex justify-center items-center bg-secondary-blue my-8 py-4 text-white font-medium px-4">
            <div className="flex-1">
              <p>Great place for promo</p>
              <p>banners and ads</p>
            </div>
            <div>
              <Button className="bg-yellow-400 hover:bg-yellow-400/90">
                Subscribe
              </Button>
            </div>
          </div>
          <RecomendedProducts categoryId="" productsForSameCategory={false} />
        </div>
      )}
    </div>
  );
};

export default EcommerceLandingPage;
