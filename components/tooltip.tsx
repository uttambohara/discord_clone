import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

type TooltipCompProps = {
  children: ReactNode;
  content: string;
};

export function TooltipComp({ children, content }: TooltipCompProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" align="end">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
