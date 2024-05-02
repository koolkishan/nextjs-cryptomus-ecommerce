"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import googleLogo from "@/public/google.png";
import { Button } from "../ui/button";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div>
      <div>
        <Button
          onClick={handleClick}
          className="w-full flex items-center font-base justify-center h-12 px-6 mt-4 text-[15px] transition-colors duration-300 bg-transparent hover:bg-transparent border border-zinc-400/20 rounded-xl focus:shadow-outline"
        >
          <div className="flex w-full items-center justify-center">
            <div>
              <Image
                src={googleLogo}
                alt="Google Logo"
                width={30}
                height={30}
                loading="lazy"
              />
            </div>
            <div className=" text-secondary-gray">
              <p className="ml-4 text-black/70 text-lg">Login With Google</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

// export function CredentialsSignInButton() {
//   const handleClick = () => {
//     signIn();
//   };

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
//       >
//         {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
//         <span className="ml-4">Continue with Email</span>
//       </button>
//     </div>
//   );
// }
