// auth.ts
import { UserRole } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";

type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

// Declare your framework library
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
