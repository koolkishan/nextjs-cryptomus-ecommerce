"use client";

import { useAppStore } from "@/store";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { getAdminDetails } from "@/data/admint";
import { AdminTypes } from "@/types";

const Header = () => {
  const { collapsSidbar, setCollapsSidbar } = useAppStore();
  const [adminDetails, setAdminDetails] = useState<AdminTypes>();
  const user = useAuthUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchAdminDetails() {
      if (user && user.email) {
        const response = await getAdminDetails(user.email);
        if (response) setAdminDetails(response);
      }
    }
    fetchAdminDetails();
  }, [user]);
  if (!isMounted) {
    return null;
  }
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
        <div className="flex justify-center items-center gap-4 py-1">
          {adminDetails?.firstName && (
            <>
              <Avatar className="rounded-full">
                <AvatarImage
                  className="rounded-full"
                  src={
                    user?.image && adminDetails?.firstName
                      ? user.image
                      : `https://ui-avatars.com/api/?background=7839ee&color=fff&name=${
                          adminDetails?.firstName + " " + adminDetails?.lastName
                        }`
                  }
                  width={40}
                  height={40}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>
                {adminDetails?.firstName?.charAt(0).toUpperCase() +
                  adminDetails?.firstName?.slice(1) +
                  " " +
                  (adminDetails?.lastName?.charAt(0).toUpperCase() +
                    adminDetails?.lastName?.slice(1))}
              </p>
            </>
          )}
        </div>
      </div>
      {/* <Button className="bg-red-700 flex mr-10" onClick={handleLogOut}>
        Log Out
      </Button> */}
    </div>
  );
};

export default Header;
