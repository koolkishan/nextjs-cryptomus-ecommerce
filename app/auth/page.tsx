"use client";
import { register } from "@/instrumentation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  GoogleSignInButton,
} from "@/components/auth/authButtons";
import googleLogo from "@/public/google.png";

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    async function callOnce() {
      await register();
    }
    callOnce();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-primary-background">

      <div className="h-full md:w-1/2  flex justify-center items-center bg-secondary-white">
        <div className="w-[200px ] px-10 lg:px-0 lg:w-[400px]">
          {/* <h1 className="text-center text-3xl text-white my-10 font-medium">
            Signin To Your Account
          </h1> */}
          <div className="grid grid-cols-3 text-[12px] ">
            {/* <div className="border-b border-secondary-black"></div> */}
            {/* <div className="border-b border-secondary-black"></div> */}
          </div>
          <div className="flex justify-center items-center mb-8 gap-5">
            <div>
              <Image
                src={googleLogo}
                alt="Google Logo"
                width={70}
                height={70}
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-3xl font-medium">Crypto Store</p>
            </div>
          </div>
          <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
      <div className="hidden lg:visible lg:w-1/2 lg:flex lg:justify-center lg:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <Image src="/Login.png" width={580} height={590} alt="login image" />
      </div>
    </div>
  );
}
