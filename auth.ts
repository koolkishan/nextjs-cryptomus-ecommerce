import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getProfileAction } from "./actions/get-profile-action";
import { createUserProfileAction } from "./actions/create-user-profile-action";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async session({ session, token }:{session:any, token:any}) {
    //   if (session.user && token.sub) {
    //     if (token.provider !== "credentials") {
    //       return {
    //         ...session,
    //         user: {
    //           ...session.user,
    //           id: token.sub,
    //           emailVerified: token.emailVerified,
    //           provider: token.provider,
    //         },
    //       };
    //     } else {
    //       try {
    //         const existingUser = await getUserById(token.sub);
    //         if (existingUser) {
    //           return {
    //             ...session,
    //             user: {
    //               ...session.user,
    //               id: token.sub,
    //               emailVerified: existingUser.emailVerified,
    //             },
    //           };
    //         }
    //       } catch (error) {}
    //     }
    //   }
    //   return session;
    // },
    // async jwt({ token, account, profile }: {token: any, account: any, profile: any}) {
    //   if (account) {
    //     token.provider = account.provider;
    //   }

    //   if (profile) {
    //     token.emailVerified = profile.email_verified;
    //   }

    //   return token;
    // },
    // async signIn({ account }: {account: any}) {
    //   if (account?.provider !== "credentials") return true;
    //   return true;
    // },
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
      if(token.sub) {
        const userProfile = await getProfileAction(token.sub);
        if (!userProfile) {
          await createUserProfileAction(token.sub);
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
