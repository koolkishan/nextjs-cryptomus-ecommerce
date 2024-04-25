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

export const updateUser = async (
  name: string,
  id: string,
  updateEmail:string,
  image: string,
) => {
  try {
    const updated = await db.user.update({
      where:{
        id
      },
      data: {
        name,
        email:updateEmail,
        image,
      },
    });
    return updated;
  } catch(error) {
    console.log('Failed to update', error);
    
  }
};
