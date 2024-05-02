import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_ADMIN_REDIRECT_URL,
  DEFAULT_USER_REDIRECT_URL,
  USER_AUTH_URL,
  ADMIN_AUTH_URL,
  PROTECTED_URL,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth((req, res) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathName = nextUrl.pathname;

  if (pathName === USER_AUTH_URL && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_USER_REDIRECT_URL, nextUrl));
  }

  if (pathName === ADMIN_AUTH_URL && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_ADMIN_REDIRECT_URL, nextUrl));
  }
 
  if (PROTECTED_URL.includes(pathName) && !isLoggedIn) {
    const redirectPath = pathName.startsWith("/admin")
      ? ADMIN_AUTH_URL
      : USER_AUTH_URL;
    return Response.redirect(new URL(redirectPath, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
