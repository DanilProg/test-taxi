import { Separator } from "@/components/ui/separator.tsx";

export const Hint = ({
  title,
  subtitle,
  selectAddress,
}: {
  title: string;
  subtitle: string;
  selectAddress: (title: string, subtitle: string) => void;
}) => {
  return (
    <div
      className="hover:cursor-pointer hover:bg-blue-300"
      onClickCapture={() => selectAddress(title, subtitle)}
    >
      {title} ({subtitle}) <Separator className="my-2" />
    </div>
  );
};
