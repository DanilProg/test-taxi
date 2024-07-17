import { Separator } from "@/components/ui/separator.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const HintSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-6 w-full mt-2" />
      <Separator className="my-2" />
    </div>
  );
};
