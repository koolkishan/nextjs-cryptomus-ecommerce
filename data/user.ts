"use server";
import { db } from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      include:{
        profile: true,
      }
    });
    return user;
  } catch (error) {}
};

export const createUserdb = async (
  name: string,
  email: string,
  image: string
) => {
  try {
    const createdUser = await db.user.create({
      data: {
        name,
        email,
        image,
      },
    });
    return createdUser;
  } catch {}
};
