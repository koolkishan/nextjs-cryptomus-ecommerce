"use client";

import { getProfileAction } from "@/actions/get-profile-action";
import { getUserByEmailAction } from "@/actions/get-user-by-email-action";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAndProfileTypes } from "@/types";
import { IoLocationSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const UserProfile = () => {
  const user = useAuthUser();
  const router = useRouter();
  const { setUserAndProfile, userAndProfile } = useAppStore();

  useEffect(() => {
    async function getUserProfile() {
      if (user?.email) {
        const userDetails = (await getUserByEmailAction(user?.email)) as any;
        if (userDetails) {
          setUserAndProfile(userDetails);
        }
      } else {
        router.push("/auth");
      }
    }
    getUserProfile();
  }, [router, setUserAndProfile, user]);

  return (
    <div className="h-full rounded-xl px-6">
      {user ? (
        userAndProfile && userAndProfile.image ? (
          <div className="h-full">
            <div className="flex gap-4 h-32 items-center">
              <div className="h-20 flex items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userAndProfile.image} />
                </Avatar>
              </div>
              <div className="flex h-20 flex-col justify-center py-6">
                <div className="font-medium text-xl">
                  <p>{userAndProfile.name.toUpperCase()}</p>
                </div>
                <div className="flex gap-4 font-light">
                  <p>Email: {userAndProfile.email}</p>
                  <p>
                    Phone:{" "}
                    {userAndProfile.profile
                      ? userAndProfile.profile[0]?.mobileNo
                      : "Add phone in profile setting"}
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="grid grid-cols-2 gap-10">
                <div className="flex mt-5 bg-secondary-white rounded-xl items-center px-2">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-primary-text mr-2">
                    <IoLocationSharp size={24} className="text-yellow-400" />
                  </div>
                  <div className="flex w-full justify-center items-center py-4  ">
                    <p className="flex-1 text-custom-font">
                      {userAndProfile.profile &&
                        userAndProfile.profile[0] &&
                        userAndProfile.profile[0].addresses &&
                        userAndProfile.profile[0].addresses[0]}
                      <br />
                      <span className="text-sm">{`(primary address)`}</span>
                    </p>
                    <p>
                      <HoverCard>
                        <HoverCardTrigger>
                          <PiDotsThreeOutlineVerticalFill
                            size={24}
                            className="text-secondary-gray bg-secondary-white"
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-32 cursor-pointer">
                          <div className="text-custom-font ">
                            <p
                              onClick={() =>
                                router.push("/profile/profile-setting")
                              }
                              className="rounded-xl text-center bg-secondary-white py-2"
                            >
                              Edit
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default UserProfile;
