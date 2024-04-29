import { getAdminDetails } from "@/data/admint";

export const getAdminDetailsAction = async (email:string) => {
    try {
        const result = await getAdminDetails(email);
        return result;
    } catch (error) {
        console.log('Error:-', error);

    }
}