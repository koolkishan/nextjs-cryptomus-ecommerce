import { Header } from "@/components/user";
import { loginIsRequiredServer } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await loginIsRequiredServer();
  return (
    <html lang="en">
      <body className="w-full h-full">
        <div className="flex flex-col marker:border-none w-full">
          <div className="sticky z-10 flex top-0 bg-secondary-white w-full py-1 border-secondary-black">
            <Header />
          </div>
          <div className="flex-1 h-full relative">{children}</div>
        </div>
      </body>
    </html>
  );
}
