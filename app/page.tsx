"use client";
import { register } from "@/instrumentation";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function callOnce() {
      await register();
    }
    callOnce();
  }, []);
  return <div>main page</div>;
}
