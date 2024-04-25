"use server";
import { db } from "./lib/db";

export const register = async () => {
  // if (process.env.NEXT_RUNTIME === "nodejs") {
  // Check for admins

  const admin = await db.admin_user.count();
  // console.log("register ~ admin:", admin);
  if (!admin) {
    const data = await db.admin_user.create({
      data: {
        firstName: "admin",
        lastName: "cryptomus",
        email: "admin@gmail.com",
        password: "admin@1234",
        status: true,
        roles: ["ADMIN"],
      },
    });
  }
};
// };
