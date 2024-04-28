import { Header, ProfileNavigation } from "@/components/user";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await loginIsRequiredServer();
  // const session = await getServerSession(authConfig);
  return (
    <div className="marker:border-none w-full h-full">
      
      <div
        className={cn(
          " lg:container px-0 lg:px-6 mt-4 w-full grid grid-cols-5 gap-10"
        )}
      >
        <div>
          <ProfileNavigation />
        </div>
        <div className="flex-1 col-span-4">{children}</div>
      </div>
    </div>
  );
}
