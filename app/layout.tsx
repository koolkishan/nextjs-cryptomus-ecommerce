"use client";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NextAuthProvider } from "@/app/providers";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
