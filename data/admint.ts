"use server";
import { db } from "@/lib/db";

export const getAdminDetails = async (email: string) => {
  const result = await db.admin_user.findFirst({
    where: {
      email,
    },
  });
  return result;
};
