import { Check, ShieldAlert } from "lucide-react";

interface AuthMessageProps {
  type: "success" | "error";
  label: string;
}

export default function AuthMessage({ type, label }: AuthMessageProps) {
  if (type === "error")
    return (
      <div className="bg-destructive/20 text-destructive p-2 rounded-md flex items-center gap-1 text-sm">
        <ShieldAlert />
        {label}
      </div>
    );
  return (
    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-md flex items-center gap-1 text-sm">
      <Check />
      {label}
    </div>
  );
}
