"use server";

import { getUserbyEmail } from "@/data/user";

export const getUserByEmailAction = async (email: string) => {
  try {
    const user = await getUserbyEmail(email);
    return user;
  } catch (error) {
    console.log("Error while getting user by email", error);
  }
};
