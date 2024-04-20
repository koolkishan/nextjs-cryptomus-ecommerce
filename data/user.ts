"use server";
import { db } from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
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
    console.log("user table database");
    const createdUser = await db.user.create({
      data: {
        name,
        email,
        image,
      },
    });
    console.log('createdUser:', createdUser)
  } catch {}
};
