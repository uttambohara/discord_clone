import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  LOGIN_SUCCESS_REDIRECT,
  authRoutes,
  prefixAPIRoute,
  publicRoutes,
} from "./routes";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoutes = authRoutes.includes(pathname);
  const isAPIprefixedRoute = pathname.startsWith(prefixAPIRoute);

  if (isAPIprefixedRoute) return null;

  if (isAuthRoutes) {
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
