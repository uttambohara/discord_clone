import { DefaultSession } from "next-auth";

type ExtendedUser = DefaultSession["user"] & {
  id: string;
};

declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: ExtendedUser;
  }
}
