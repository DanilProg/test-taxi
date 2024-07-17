import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { cn } from "@/lib/utils.ts";
import { ReactNode } from "react";

export const TaxiListLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode[] | ReactNode;
}) => {
  return (
    <ScrollArea className={cn("rounded-md border", className)}>
      <div className="p-4">{children}</div>
    </ScrollArea>
  );
};
