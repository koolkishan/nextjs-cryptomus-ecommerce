"use server";

import { updateProfile } from "@/data/profile";
import { updateUser } from "@/data/user";
import { UserProfileSchema } from "@/schemas";
import { z } from "zod";

export const updateProfileAction = async (
  values: z.infer<typeof UserProfileSchema>,
  image: string,
  profileId: string,
  // email:string,
  id:string
) => {
  try {
    // const validation = UserProfileSchema.safeParse(values);
    const { firstName, lastName, updatedEmail, phone, address } = values;
    const name = firstName + " " + lastName;
    const updateUserResponse = await updateUser(name,id, updatedEmail, image);
    const updateUserProfile =  await updateProfile([address],phone, profileId)
    return { success: "Profile updated successfully" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to verify user.",
      };
    }
  }
};
