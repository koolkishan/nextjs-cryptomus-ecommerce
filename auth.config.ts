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
      },
    }),
  ],
} satisfies NextAuthConfig;
