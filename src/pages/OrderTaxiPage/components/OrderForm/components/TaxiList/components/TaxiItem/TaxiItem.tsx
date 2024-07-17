import { Separator } from "@/components/ui/separator.tsx";
import { Car } from "@/components/shared/Car/Car.tsx";

export const TaxiItem = ({
  color,
  carName,
  distance,
  onSelectCrew,
}: {
  color: string;
  carName: string;
  distance: number;
  onSelectCrew: () => void;
}) => {
  return (
    <div className="p-4 cursor-pointer" onClick={onSelectCrew}>
      <div className={`flex pb-2`}>
        <div style={{ color }} className={`flex gap-4 items-center`}>
          <Car />
          <h2>{carName}</h2>
        </div>
        <div className="ml-auto">{distance}</div>
      </div>
      <Separator />
    </div>
  );
};
