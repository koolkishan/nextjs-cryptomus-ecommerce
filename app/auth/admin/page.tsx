'use client';
import Image from "next/image";
import { CredentialsForm } from "@/components/auth/credentialsForm";
import { useEffect, useState } from "react";
import { register } from "@/instrumentation";

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
      <div className="hidden lg:visible lg:w-1/2 lg:flex lg:justify-end">
        <Image src="/Login.png" width={580} height={590} alt="login image" />
      </div>
      <div className="h-[90%] md:w-1/2 md:mx-32 flex justify-center items-center  bg-surface rounded-2xl">
        <div className="w-[200px ] px-10 lg:px-0 lg:w-[400px]">
          <h1 className="text-center text-3xl text-white my-10 font-medium">
            Sign In To Your Account
          </h1>
          <div className="grid grid-cols-3 text-[12px] ">
            <div className="border-b border-secondary-black"></div>
            <div className="border-b border-secondary-black"></div>
          </div>
          <CredentialsForm />
        </div>
      </div>
    </div>
  );
}
