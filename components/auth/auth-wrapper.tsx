import Link from "next/link";
import SocialIcon from "./social-icon";

interface AuthWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  hasSocialIcons: boolean;
  backLinkLabel: string;
  backLinkHref: string;
}

export default function AuthWrapper({
  title,
  description,
  children,
  hasSocialIcons,
  backLinkLabel,
  backLinkHref,
}: AuthWrapperProps) {
  return (
    <div className="w-[24rem] mx-auto border border-slate-200 p-6 rounded-md shadow-md space-y-6">
      {/* Head */}
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl">👋 {title}</h2>
          <p>{description}</p>
        </div>

        {hasSocialIcons && (
          <div className="flex flex-col gap-2">
            <SocialIcon label="google" size="md" />
            <SocialIcon label="github" size="md" />
          </div>
        )}
      </div>
      {/* Body */}
      <div>{children}</div>
      {/* Foot */}
      <div className="text-center">
        {backLinkLabel && (
          <Link href={backLinkHref} className="text-sm">
            🖇️ {backLinkLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
