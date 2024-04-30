"use client";
import { register } from "@/instrumentation";
import { useEffect, useState } from "react";
import { GoogleSignInButton } from "@/components/auth/authButtons";
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
    <div className="h-screen ">
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/5 bg-white p-8 rounded-lg  border-2 shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]">
          <h1 className="w-full text-2xl font-medium mb-4">Sign in</h1>
          <CredentialsForm />
          <div className="relative w-full mt-4 mb-6 grid grid-cols-3 text-[12px] ">
            <div className="border-b border-zinc-400/20"></div>
            <p className="inline-block text-center mb-[-8px] text-zinc-400">
              OR
            </p>
            <div className="border-b border-zinc-400/20"></div>
          </div>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
