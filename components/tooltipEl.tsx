import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipEl = {
  children: React.ReactNode;
  content: string;
  align?: "center" | "start" | "end" | undefined;
  side?: "top" | "right" | "bottom" | "left" | undefined;
};

export default function TooltipEl({
  children,
  content,
  align = "end",
  side = "right",
}: TooltipEl) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
