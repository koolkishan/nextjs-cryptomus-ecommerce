"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import {
    CircleUserRound,
    NotebookTabs,
    Heart,
    Power,
    PowerOff,
} from "lucide-react";
// import { findUserByEmail } from "@/data-access/user";
// import { findAddressByUserId } from "@/data-access/address";

const Profile = () => {
    //   const { setOpenModal, setUserDetails, setUserAddress } = useAppStore();
    const router = useRouter();
    const user = useAuthUser();


    const handleLogin = (action: string) => {
        // if (!user) {
        //   // setOpenModal(true);
        //   router.push("/login");
        // } else {
        //   if (action === "profile") {
        //     router.push("/my-account");
        //   } else if (action === "address") {
        //     router.push("/my-account/my-address");
        //   }
        // }
        // if (action === "login") {
        //   // setOpenModal(true);
        //   router.push("/login");
        // }
    };

    const handleLogOut = () => {
        signOut();
        router.push("/");
    };

    return (
        <div className="my-3">
            {/* My Profile section */}
            <div className="mb-6">
                <div className="flex" onClick={handleLogOut}>
                    <CircleUserRound size={30} className="mr-4" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
