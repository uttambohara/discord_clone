import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipElProps = {
  children: React.ReactNode;
  content: string;
  side?: "left" | "right" | "top" | "bottom" | undefined;
  align?: "center" | "end" | "start" | undefined;
};

export function TooltipEl({ children, content, side, align }: TooltipElProps) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" align="end">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
