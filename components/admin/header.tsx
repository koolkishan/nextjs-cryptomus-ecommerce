"use client";

import { useAppStore } from "@/store";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
  const { collapsSidbar, setCollapsSidbar } = useAppStore();
  const router = useRouter();
  const user = useAuthUser();

  

  return (
    <div className="flex">
      <div className="hidden md:flex-1 md:flex md:justify-start ">
        <Button
          className="bg-transparent hover:bg-transparent"
          onClick={() => setCollapsSidbar(!collapsSidbar)}
        >
          <HiOutlineMenuAlt2 size={22} />
        </Button>
      </div>
      <div className="border border-l border-secondary-black mr-10 my-2"></div>
      <div className="mr-10 text-primary-text">
        <div className="flex justify-center items-center gap-4 ">
          <Avatar className="rounded-full">
            <AvatarImage
              className="rounded-full"
              src={user?.image ? user.image : "https://github.com/shadcn.png"}
              width={50}
              height={50}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Art Template</p>
        </div>
      </div>
      {/* <Button className="bg-red-700 flex mr-10" onClick={handleLogOut}>
        Log Out
      </Button> */}
    </div>
  );
};

export default Header;
