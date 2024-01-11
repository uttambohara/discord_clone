import { AlertTriangle, CheckCircle } from "lucide-react";

interface CardMessageProp {
  type: "success" | "error";
  label: string;
}

export default function CardMessage({ type, label }: CardMessageProp) {
  if (type === "error")
    return (
      <div className="p-3 bg-destructive/10 text-destructive/80 text-sm flex items-center gap-2">
        <AlertTriangle size={22} color="red" />
        <span> {label}</span>
      </div>
    );

  return (
    <div className="p-3 bg-emerald-100 text-emerald-600 text-sm flex items-center gap-2">
      <CheckCircle size={22} color="green" />
      {label}
    </div>
  );
}
