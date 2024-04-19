"use client";
import { register } from "@/instrumentation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/auth/authButtons";
import { CredentialsForm } from "@/components/auth/credentialsForm";

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
            Login To Your Account
          </h1>
          <GoogleSignInButton />
          <GithubSignInButton />
          <p className="text-center mt-7 text-base text-custom-font">Or Login With Email</p>
          <CredentialsForm />
        </div>
      </div>
    </div>
  );
}
