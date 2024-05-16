"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { IoHomeSharp, IoSettingsSharp } from "react-icons/io5";
import { RiChatHistoryFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

const ProfileNavigation = () => {
  const path = usePathname();
  const router = useRouter();
  const handleLogOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="bg-white p-2 ">
      <div>
        <p
          className={cn(
            "flex items-center gap-3 cursor-pointer py-2 px-2 my-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/profile")}
        >
          <IoHomeSharp
            size={22}
            className={cn(
              path === "/profile"
                ? " rounded-lg text-blue-600    "
                : "text-custom-font"
            )}
          />
          Account
        </p>
        <p
          className={cn(
            "flex items-center gap-3 cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile/whishlist"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/profile/wishlist")}
        >
          <FaHeart
            size={22}
            className={cn(
              path === "/profile/wishlist"
                ? " rounded-lg text-blue-600    "
                : "text-custom-font"
            )}
          />
          Wishlists
        </p>
        <p
          className={cn(
            "flex items-center gap-3 cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile/order"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/profile/order")}
        >
          <RiChatHistoryFill
            size={22}
            className={cn(
              path === "/profile/order"
                ? " rounded-lg text-blue-600    "
                : "text-custom-font"
            )}
          />
          Orders
        </p>
        <p
          className={cn(
            "flex items-center gap-3 cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600",
            path === "/profile/setting"
              ? "bg-blue-100 border rounded-lg text-blue-600    "
              : ""
          )}
          onClick={() => router.push("/profile/setting")}
        >
          <IoSettingsSharp
            size={22}
            className={cn(
              path === "/profile/setting"
                ? " rounded-lg text-blue-600    "
                : "text-custom-font"
            )}
          />
          Settings
        </p>
        <p
          className={cn(
            "flex items-center gap-3 cursor-pointer py-2 px-2 mb-4 hover:bg-blue-100 hver:border hover:rounded-lg hover:text-blue-600"
          )}
          onClick={handleLogOut}
        >
          <TbLogout2
            size={22}
            className={cn(
              path === "/profile/logout"
                ? " rounded-lg text-blue-600   hover:text-blue-600  "
                : "text-custom-font  hover:text-blue-600"
            )}
          />
          Signout
        </p>
      </div>
    </div>
  );
};

export default ProfileNavigation;
