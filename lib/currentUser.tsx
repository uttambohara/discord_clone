import { auth } from "@/auth";

export default async function currentUser() {
  const data = await auth();
  return data?.user;
}
