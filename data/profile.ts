"use server";
import { db } from "@/lib/db";

export const createUserProfile = async (userId: string) => {
  try {
    await db.profile.create({
      data: {
        userId,
      },
    });
  } catch (error) {
    console.log("Error creating user profile", error);
  }
};

export const getProfileById = async (userId: string) => {
  try {
    return await db.profile.findFirst({
      where: {
        userId,
        user: {},
      },
    });
  } catch (error) {
    console.log("Error while fetching profile");
  }
};

export const updateProfile = async (addresses: string[], mobileNo:string, id:string) => {
  try {
    return await db.profile.update({
      where: {
        id,
      },
      data: {
        addresses,
        mobileNo,
      },
    });
  } catch (error) {
    console.log("Error while updating profile");
  }
};
