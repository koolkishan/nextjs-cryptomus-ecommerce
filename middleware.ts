import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { protectedEndpoints } from "./routes";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathName = nextUrl.pathname;
  if (protectedEndpoints[pathName] && !isLoggedIn) {
    return Response.redirect(new URL("/auth", nextUrl));
  } else if (pathName === "/auth" && isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
