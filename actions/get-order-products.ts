'use server';

import { db } from "@/lib/db";

export const getOrderProductAction = async (orderId: string) => {
    try {
        const result = await db.orderProduct.findMany({
            where:{
                id:orderId
            }
        })
        // console.log(result, ":::::");
        return result;
        
    } catch (error) {
        
    }
}