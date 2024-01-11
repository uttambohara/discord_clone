import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
  authRoutes,
  prefixApiRoutes,
  publicRoutes,
  LOGIN_SUCCESS_REDIRECT,
} from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPrefixAPIRoute = pathname.startsWith(prefixApiRoutes);

  if (isPrefixAPIRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_SUCCESS_REDIRECT, req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
