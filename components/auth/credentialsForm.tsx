"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdAlternateEmail, MdOutlineLockOpen } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { CiLock } from "react-icons/ci";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/admin/dashboard");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your Email or Password is wrong!");
    }
  };

  return (
    <div>
      <form
        className="w-full h-full text-xl font-semibold flex flex-col"
        onSubmit={handleSubmit}
      >
        {error && (
          <span className="p-4 py-2 mb-4 text-center text-lg font-semibold text-white bg-destructive/20 rounded-md">
            {error}
          </span>
        )}
        <div className="relative">
          <MdAlternateEmail className="absolute text-zinc-400 mt-[10px] mx-2" />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-8 py-2 mb-4 text-primary-text rounded-md border border-zin-400/20 bg-transparent focus:border-custom-font placeholder:text-zinc-400 placeholder:font-medium placeholder:text-lg"
          />
        </div>

        <div className="relative">
          <MdOutlineLockOpen className="absolute text-zinc-400 mt-[10px] mx-2 " />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-8 py-2 mb-4 text-primary-text rounded-md border border-zinc-400/20 bg-transparent focus:border-custom-font placeholder:text-zinc-400 placeholder:font-medium placeholder:text-lg"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-10  px-6 text-lg text-white transition-colors duration-150 bg-secondary-blue  rounded-md focus:shadow-outline hover:bg-secondary-blue"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
