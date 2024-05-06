"use client";
import { UserProfile } from "@/components/user";
import { useAuthUser } from "@/hooks/useAuthUser";
// import { loginIsRequiredServer } from "@/lib/auth";/'/'
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
  // const user = useAuthUser();
  // const router = useRouter();
  // if (typeof window !== "undefined") {
  //   if (!user) router.push("/auth");
  // }

  return (
    <div className="h-[calc(100vh-242px)] bg-white">
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
