"use client";
import { createUserdb, getUserbyEmail } from "@/data/user";
import { useAuthUser } from "@/hooks/useAuthUser";
import Image from "next/image";
import { useEffect } from "react";
import HorizontalProductList from "./horizontal-product-list";
import { getProducts } from "@/actions/get-products";
import { useAppStore } from "@/store";
import NewProduct from "./new-products";
import RecomendedProducts from "./recommended";
import { Button } from "../ui/button";
import Categories from "./categories";
const EcommerceLandingPage = () => {
  const user = useAuthUser();
  const { userProductsData, setUserProductsData } = useAppStore();

  useEffect(() => {
    async function createUser() {
      if (user?.email && user?.name && user?.image) {
        const dbUser = await getUserbyEmail(user.email);
        if (!dbUser) {
          await createUserdb(user.name, user.email, user.image);
        }
      }
    }

    createUser();
  }, [user]);

  useEffect(() => {
    async function getProductsData() {
      const response = await getProducts();
      if (response && response.length > 0) {
        setUserProductsData(response);
      }
    }
    getProductsData();
  }, [setUserProductsData]);

  return (
    <div className="lg:container flex px-6 lg:px-0">
      {/* <div className="relative w-1/4 bg-red-300 h-[300px]"> */}
      {/* <Image
          src="/landing-page.jpg"
          alt="landing page"
          layout="fill"
        /> */}
      {/* <p>filter product logic</p> */}
      {/* </div> */}
      {/* <div className="relative w-3/4 bg-red-600 h-[300px]"> */}
      {/* <Image
          src="/landing-page.jpg"
          alt="landing page"
          layout="fill"
        /> */}
      {/* </div> */}
      {userProductsData.length > 0 && (
        <div>
          <div className="w-full">
            <Image
              src="/best-deal.png"
              alt="best deal"
              className="w-full h-[350px] cursor-pointer"
              width={500}
              height={150}
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
