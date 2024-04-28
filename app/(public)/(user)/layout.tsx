"use client";
import { Footer, Header } from "@/components/user";
import { loginIsRequiredServer } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await loginIsRequiredServer();
  const path = usePathname();
  console.log("path:", path);

  return (
    <html lang="en">
      <body className="w-full h-full">
        <div className="flex flex-col marker:border-none w-full">
          <div className="sticky z-10 flex top-0 bg-secondary-white w-full py-1 border-secondary-black">
            <Header />
          </div>
          <div className="flex-1 h-full relative">{children}</div>
          <div
            
          >
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
