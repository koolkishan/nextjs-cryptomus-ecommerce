// import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./lib/db";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        console.log("authorize ~ credentials:", credentials);
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await db.admin_user.findFirst({
          where: { email: credentials.email },
        });

        if (dbUser && dbUser.password === credentials.password) {
          const { password, id } = dbUser;
          return dbUser;
        }
        return null;

        // const validatedFields = LoginFormSchema.safeParse(credentials);

        // if (!validatedFields.success) {
        //   return null; // Validation failed
        // }

        // const { emailOrUsername, password } = validatedFields.data;
        // const user = await db.user.findFirst({
        //   where: {
        //     OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
        //   },
        // });

        // if (!user) {
        //   // User not found
        //   return null;
        // }

        // if (user.password) {
        //   const passwordMatch = await bcrypt.compare(password, user.password);
        //   if (!passwordMatch) {
        //     // Password does not match
        //     return null;
        //   }
        // }

        // Convert user ID to string if it's a number
        
      },
    }),
  ],
} satisfies NextAuthConfig;
