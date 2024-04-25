"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ProfileNavigation = () => {
  const path = usePathname();
  const handleLogOut = () => {
    signOut();
  };

  return (
    <div className="">
      <div>
        <p
          className={cn(
            "py-2 px-2 m-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
        >
          Account main
        </p>
        <p
          className={cn(
            "py-2 px-2 m-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/Order"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
        >
          Orders history
        </p>
        <p
          className={cn(
            "py-2 px-2 m-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/whishlist"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
        >
          My wishlist
        </p>
        <p
          className={cn(
            "py-2 px-2 m-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/transaction"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
        >
          Transaction
        </p>
        <p
          className={cn(
            "py-2 px-2 m-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile-setting"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
        >
          Profile setting
        </p>
        <p
          className={cn(
            "py-2 px-2 m-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600"
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
