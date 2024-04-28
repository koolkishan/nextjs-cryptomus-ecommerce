"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import googleLogo from "@/public/google.png";
import { BsTwitterX } from "react-icons/bs";
import { Button } from "../ui/button";
// import githubLogo from "@/public/github.png";

export function GoogleSignInButton() {
  const router = useRouter();

  const handleClick = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full flex items-center font-base justify-center h-12 px-6 mt-4 text-[15px] transition-colors duration-300 bg-transparent hover:bg-transparent border border-zinc-400/20 rounded-xl focus:shadow-outline"
    >
      <div className="flex w-full items-center justify-center">
        <div>
          <Image
            src={googleLogo}
            alt="Google Logo"
            width={20}
            height={20}
            loading="lazy"
          />
        </div>
        <div className="flex-1 w-full text-secondary-gray">
          <span className="ml-4 text-black/70">Continue With Google</span>
        </div>
      </div>
    </Button>
  );
}

export function GithubSignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-base justify-center h-12 px-6 mt-4 text-[15px] transition-colors duration-300 bg-transparent border border-secondary-black rounded-xl focus:shadow-outline"
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <div className="flex w-full items-center justify-center">
        <div>
          <BsTwitterX />
        </div>
        <div className="flex-1 text-secondary-gray">
          <span className="ml-4 ">Login With Twitter</span>
        </div>
      </div>
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}
