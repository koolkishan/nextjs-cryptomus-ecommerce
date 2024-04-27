"use server";

import { getProfileById } from "@/data/profile";

export const getProfileAction = async (userId: string) => {
  try {
    const profile = await getProfileById(userId);
    console.log("getProfileAction ~ profile:", profile);
    return profile;
  } catch (error) {
    console.log("Error while getting profile", error);
  }
};
