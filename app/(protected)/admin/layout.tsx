import { Header, Side } from "@/components/admin";
// import { loginIsRequiredServer } from "@/lib/auth";

// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await loginIsRequiredServer();
  return (
    <html lang="en">
      <body className="w-full">
        <div className="flex w-full bg-[#1D1E24]">
          <div className="sticky top-0 h-screen">
            <Side />
          </div>
          <div className="flex flex-col w-full overflow-y-auto">
            <div className="w-full border-b py-1 border-secondary-black">
              <Header />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
