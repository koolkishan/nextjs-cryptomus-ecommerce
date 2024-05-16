"use client";
import { register } from "@/instrumentation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleSignInButton } from "@/components/auth/authButtons";
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
        <div className="w-[200px] px-10 lg:px-0 lg:w-[400px]">
          <div className="flex justify-center w-full items-center mb-8 gap-5">
            <div className="flex items-center md:mr-10 lg:mr-32 text-secondary-blue gap-3 mx-auto ">
              <svg
                fill="none"
                height="48"
                viewBox="0 0 44 48"
                width="44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#7839ee">
                  <path d="m16 8 5.0912 10.9088 10.9088 5.0912-10.9088 5.0912-5.0912 10.9088-5.0912-10.9088-10.9088-5.0912 10.9088-5.0912z" />
                  <path
                    d="m20.0469 31.3286 6.3539-1.0932 3.6 9.7646 3.6-9.7646 10.2565 1.7646-6.6564-8 6.6564-8-10.2565 1.7646-3.6-9.7646-3.6 9.7646-6.3539-1.0932 1.0442 2.2374 10.9088 5.0912-10.9088 5.0912z"
                    opacity=".5"
                  />
                </g>
              </svg>
              <p className="text-start text-xl font-semibold">
                <span className="text-[#7839ee] opacity-70">Crypto</span>
                <span className="text-[#7839ee]">Store</span>
              </p>
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
