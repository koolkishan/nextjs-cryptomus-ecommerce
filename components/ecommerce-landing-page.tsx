"use client";
import { createUserdb, getUserbyEmail } from "@/data/user";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useEffect } from "react";
const EcommerceLandingPage = () => {
  const user = useAuthUser();

  useEffect(() => {
    async function createUser() {
      if (user?.email && user?.name && user?.image) {
        const dbUser = await getUserbyEmail(user.email);
        if (!dbUser) {
          await createUserdb(user.name, user.email, user.image);
        }
      }
    }
    createUser();
  }, [user]);
  
  return <div>Landing Page</div>;
};

export default EcommerceLandingPage;
