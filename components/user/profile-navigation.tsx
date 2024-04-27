"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ProfileNavigation = () => {
  const path = usePathname();
  const router = useRouter();
  const handleLogOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="">
      <div>
        <p
          className={cn(
            "cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/profile")}
        >
          Account main
        </p>
        <p
          className={cn(
            "cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/whishlist"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/wishlist")}
        >
          My wishlist
        </p>
        <p
          className={cn(
            "cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile/profile-setting"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/profile/profile-setting")}
        >
          Profile setting
        </p>
        <p
          className={cn(
            "cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600"
            // path === "/logout"
            //   ? "bg-blue-100 border rounded-lg text-blue-600    "
            //   : ""
          )}
          onClick={handleLogOut}
        >
          LogOut
        </p>
      </div>
    </div>
  );
};

export default ProfileNavigation;
