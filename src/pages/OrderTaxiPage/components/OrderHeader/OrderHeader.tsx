import { cn } from "@/lib/utils.ts";

export const OrderHeader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "flex pb-1 border-b-[1px] border-solid border-black",
      )}
    >
      Детали заказа
    </div>
  );
};
