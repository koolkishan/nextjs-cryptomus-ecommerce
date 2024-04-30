/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FaUser } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./search";
import { useAuthUser } from "@/hooks/useAuthUser";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const user = useAuthUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    if (user) {
      router.push("/wishlist");
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");

    }
  };

  const handleCart = () => {
    if (user) {
      router.push("/cart");
    } else {
      toast.error("Please sign in to proceed.");
      router.push("/auth");

    }
  };

  const handleProfile = () => {
    if (user) {
      router.push("/profile");
    } else {
      toast.error("Please sign in to proceed.");
      router.push("/auth");

    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex md:block w-full flex-col">
      <div className="  flex w-full items-center py-6 mb-2 lg:container px-6 lg:px-0 text-primary-txt ">
        <div className="flex w-[80%] md:w-[60%] lg:w-[70%]">
          <div
            className="flex  cursor-pointer md:mr-10 lg:mr-32 text-secondary-blue"
            onClick={() => router.push("/")}
          >
            <p className="ml-2 flex flex-col items-center justify-center">
              <p className="text-2xl md:text-3xl font-bold">CRYPTO</p>
              <p className="text-xl md:text-2xl font-bold">STORE</p>
            </p>
          </div>
          <div className=" hidden md:flex md:flex-col md:justify-center w-1/2">
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
            <div
              className="flex items-center cursor-pointer"
              onClick={handleClick}
            >
              {" "}
              <IoHeartSharp size={22} className=" md:mr-4  text-primary-gray" />
              <p className="hidden md:block font-medium">Wishlist</p>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={handleCart}
            >
              <IoCart size={22} className=" md:mr-4  text-primary-gray" />
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
