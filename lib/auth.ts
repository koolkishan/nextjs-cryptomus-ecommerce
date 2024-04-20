// 'use server';

import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// import { createUser } from "@/actions/user";
import { db } from "./db";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await db.admin_user.findFirst({
          where: { email: credentials.email },
        });
        console.log("authorize ~ dbUser:", dbUser);

        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        if (dbUser && dbUser.password === credentials.password) {
          const { password, id } = dbUser;
          return dbUser;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.providerAccountId;
        token.accessToken = account.access_token;
      }
      return token;
    },
   
    async signIn({ account, profile }) {
      if (account?.provider !== "credentials") return true;
      return true;
    },
    async session({ token, user, session }) {
      return session;
    },
    
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/");
//   }
// }
