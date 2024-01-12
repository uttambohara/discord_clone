import { auth } from "@/auth";

export default async function currentUser() {
  const session = await auth();
  if (!session) return null;
  return session.user;
}
