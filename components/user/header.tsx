/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";
import { IoHeartSharp, IoLocationSharp, IoMenuOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import Search from "./search";
import { useAuthUser } from "@/hooks/useAuthUser";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const { setProductCategory, productCategory } = useAppStore();
  const user = useAuthUser();

  const handleClick = async () => {
    // if (user?.id) {
    //   const cartProducts = await getAllProductFromCart({
    //     userId: user?.id,
    //   });
    //   if (cartProducts) {
    //     const cartFilterProducts = [];
    //     for (let id of cartProducts.productId) {
    //       const product = products.find((p) => +p.id === +id);
    //       cartFilterProducts.push(product);
    //     }
    //     if (cartFilterProducts) {
    //       const combinedCart = [...addToCartProduct, ...cartFilterProducts];
    //       const uniqueProducts = new Set();
    //       const uniqueUpdatedCart = combinedCart.filter((product) => {
    //         if (!uniqueProducts.has(product?.id)) {
    //           uniqueProducts.add(product?.id);
    //           return true;
    //         }
    //         return false;
    //       }) as ProductTypes[];
    //       setAddToCartProduct(uniqueUpdatedCart);
    //     }
    //   }
    // }
    if (user) {
      //   router.push("/cart");
    } else {
      //   router.push("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const products = await getProducts();
        // if (products) {
        //   setProducts(products);
        // }
      } catch (error) {
        // console.error("Error calling oneEntryTry:", error);
      }
    };
    fetchData();
  }, []);

  // get products for particular product.
  // const handleCategory = (name: string) => {
  //   setProductCategory(name);
  // };

  // const handleLogOut = () => {
  //   // signOut();
  //   router.push("/auth");
  // };

  const handleProfile = () => {
    // if (user) {
    router.push("/profile");
    // } else {
    // router.push("/");
    // }
  };

  return (
    <div className="flex md:block w-full flex-col">
      <div className="  flex w-full items-center py-6 mb-2 lg:container px-6 lg:px-0 text-primary-txt ">
        <div className="flex w-[80%] md:w-[60%] lg:w-[70%]">
          <div className="flex text-4xl md:mr-10 lg:mr-32 text-secondary-blue">
            {/* <Image src="/Rocket.png" alt="logo" width={40} height={40} /> */}
            <p className="ml-2">ABC</p>
          </div>
          <div className="hidden md:block w-1/2">
            <Search />
          </div>
        </div>
        <div className="flex w-full md:w-[40%] lg:w-[30%]">
          <div className="flex justify-end gap-6 md:grid md:grid-cols-3 w-full items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleProfile}
            >
              {" "}
              <FaUser
                size={18}
                className=" md:mr-4  text-primary-gray"
                // onClick={handleClick}
              />
              <p className="hidden md:block font-medium">Profile</p>
            </div>
            <div className="flex items-center cursor-pointer">
              {" "}
              <IoHeartSharp
                size={22}
                className=" md:mr-4  text-primary-gray"
                onClick={handleClick}
              />
              <p className="hidden md:block font-medium">Wishlist</p>
            </div>
            <div className="flex items-center cursor-pointer">
              <IoCart
                size={22}
                className=" md:mr-4  text-primary-gray"
                onClick={handleClick}
              />
              <p className="hidden md:block font-medium">My cart</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block text-primary-white relative md:hidden lg:container lg:px-0 px-6 mb-4">
        <Search />
      </div>
    </div>
  );
};

export default Header;

{
  /* <div className="bg-secondary-white my-2">
<div className="flex  gap-8 lg:container px-6 lg:px-0 content-center items-center  text-center">
  
  <p
    className={cn(
      "py-2 text-sm",
      productCategory == "Electronics"
        ? "border-b border-secondary-blue"
        : ""
    )}
    onClick={() => handleCategory("Electronics")}
  >
    Electronics
  </p>
  <p
    className={cn(
      "py-2 text-sm",
      productCategory == "Books & Media"
        ? "border-b border-secondary-blue"
        : ""
    )}
    onClick={() => handleCategory("Books & Media")}
  >
    Books & Media
  </p>
  <p
    className={cn(
      "py-2 text-sm",
      productCategory == "Jewelry & Watches"
        ? "border-b border-secondary-blue"
        : ""
    )}
    onClick={() => handleCategory("Jewelry & Watches")}
  >
    Jewelry & Watches
  </p>
  <p
    className={cn(
      "py-2 text-sm",
      productCategory == "Electronics Accessories"
        ? "border-b border-secondary-blue"
        : ""
    )}
    onClick={() => handleCategory("Electronics Accessories")}
  >
    Electronics Accessories
  </p>
  <p
    className={cn(
      "py-2 text-sm",
      productCategory == "Baby & Kids"
        ? "border-b border-secondary-blue"
        : ""
    )}
    onClick={() => handleCategory("Baby & Kids")}
  >
    Baby & Kids
  </p>
  <p
    className={cn(
      "py-2 text-sm",
      productCategory == "Clothes"
        ? "border-b border-secondary-blue"
        : ""
    )}
    onClick={() => handleCategory("Clothes")}
  >
    Clothes
  </p>
</div>
</div> */
}
