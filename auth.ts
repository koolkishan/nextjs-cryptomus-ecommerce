import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getProfileAction } from "./actions/get-profile-action";
import { createUserProfileAction } from "./actions/create-user-profile-action";
import { getUserByEmailAction } from "./actions/get-user-by-email-action";
import { getAdminDetailsAction } from "./actions/get-admin-details";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
      if (token.sub && token.email) {
        const adminDetails = await getAdminDetailsAction(token.email);
        if (!adminDetails) {
          const userProfile = await getProfileAction(token.sub);
          if (!userProfile) {
            await createUserProfileAction(token.sub);
          }
        }
      }
      if (session.user && token.sub && token.email) {
        const getUserByEmail = await getUserByEmailAction(token.email);
        if (token.provider !== "credentials") {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.sub,
              emailVerified: token.emailVerified,
              provider: token.provider,
              role: getUserByEmail?.role,
            },
          };
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
