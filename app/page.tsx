import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <p>{session?.user?.name}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Log out</Button>
      </form>
    </>
  );
}
