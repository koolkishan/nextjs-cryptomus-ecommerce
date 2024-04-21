"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <form
      className="w-full h-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <div>
        <label
          htmlFor=""
          className="text-primary-gray font-normal text-base mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          className="w-full px-4 py-2 mb-4  text-custom-font rounded-xl border border-secondary-black bg-transparent focus:border-custom-font placeholder:font-extralight placeholder:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor=""
          className="text-primary-gray font-normal text-base mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="w-full px-4 py-2 mb-4  text-custom-font rounded-xl border border-secondary-black bg-transparent focus:border-custom-font placeholder:font-extralight placeholder:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-secondary-blue  rounded-2xl focus:shadow-outline"
      >
        Log in
      </button>
    </form>
  );
}
