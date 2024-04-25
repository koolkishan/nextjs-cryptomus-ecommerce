import { createUserProfile } from "@/data/profile";

export const createUserProfileAction = async (userId:string) => {
    try {
        await createUserProfile(userId);
    } catch (error) {
        console.log('Error creating user profile', error);
        
    }
}