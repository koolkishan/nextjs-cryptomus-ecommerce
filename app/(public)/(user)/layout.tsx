"use client";
import { Footer, Header } from "@/components/user";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  console.log("pathName:", pathName);
  return (
    <html lang="en">
      <body className="w-full h-full">
        <div className="flex flex-col marker:border-none w-full">
          <div className="sticky z-10 flex top-0 bg-secondary-white w-full py-1 border-secondary-black">
            <Header />
          </div>
          <div
            className={cn(
              "flex-1 h-full relative",
              pathName === "/"
                ? "min-h-[calc(100vh-85px)]"
                : "min-h-[calc(100vh-210px)]"
            )}
          >
            {children}
          </div>
        </div>
        <div className="z-10 bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
