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
import ContainerLoader from "../loader";

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
    <div className="lg:container lg:px-0 px-6 h-full">
      <div>
        <div className="flex h-[350px] gap-5 bg-primary-text my-4">
          <div className=" w-1/3 h-[350px] py-4">
            <Categories />
          </div>
          <div className="">
            <Image
              src="/best-deal.png"
              alt="best deal"
              className="w-full h-[350px] cursor-pointer py-4"
              width={500}
              height={150}
              loading="lazy"
            />
          </div>

        </div>
        <p className="text-2xl font-medium mt-6 mb-4">New Products</p>
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
        <p className="text-2xl font-medium my-4">Recommended</p>
        <RecomendedProducts categoryId="" productsForSameCategory={false} />
      </div>

    </div>
  );
};

export default EcommerceLandingPage;
