import { useSession } from "next-auth/react";

export const useAuthUser = () => {
  const { data: session } = useSession();
  return session?.user;
};
