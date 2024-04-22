"use client";
import { createUserdb, getUserbyEmail } from "@/data/user";
import { useAuthUser } from "@/hooks/useAuthUser";
import Image from "next/image";
import { useEffect } from "react";
import HorizontalProductList from "./horizontal-product-list";
const EcommerceLandingPage = () => {
  const user = useAuthUser();

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

  useEffect(() => { }, []);

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
      <div>
        <p>New Prodcuts</p>
        <HorizontalProductList />
      </div>
    </div>
  )
};

export default EcommerceLandingPage;
