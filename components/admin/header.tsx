"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  );
};

export default Header;
