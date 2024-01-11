import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { LOGIN_SUCCESS_REDIRECT } from "@/routes";

export default function Social() {
  function handleClick(provider: "google" | "github") {
    signIn(provider, {
      callbackUrl: LOGIN_SUCCESS_REDIRECT,
    });
  }

  return (
    <div className="flex w-full gap-4">
      <Button
        variant="outline"
        className="flex items-center gap-2 w-full"
        onClick={() => handleClick("google")}
      >
        <FcGoogle size={28} />
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 w-full"
        onClick={() => handleClick("github")}
      >
        <FaGithub size={28} />
      </Button>
    </div>
  );
}
