import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { LOGIN_SUCCESS_REDIRECT } from "@/routes";

interface SocialIconProps {
  label: "google" | "github";
  size: "sm" | "md" | "lg";
}

const socialIconMap = {
  google: FcGoogle,
  github: FaGithub,
};

const socialIconSize = {
  sm: "18px",
  md: "24px",
  lg: "28px",
};

export default function SocialIcon({ label, size }: SocialIconProps) {
  const Icon = socialIconMap[label];

  function handleClick(type: "github" | "google") {
    try {
      signIn(type, {
        callbackUrl: LOGIN_SUCCESS_REDIRECT,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => handleClick(label)}
    >
      <span>
        <Icon size={socialIconSize[size]} />
      </span>
      Login with {label}
    </Button>
  );
}
