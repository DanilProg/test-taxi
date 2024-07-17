import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { cn } from "@/lib/utils.ts";
import { ReactNode } from "react";

export const HintListLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <ScrollArea className={cn("h-72 w-48 rounded-md border", className)}>
      <div className="p-4">{children}</div>
    </ScrollArea>
  );
};
