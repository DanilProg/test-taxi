import { ICrew } from "@/contracts/contracts.ts";

export const SelectCrew = ({ crew }: { crew: ICrew }) => {
  return (
    <div className="border p-1 w-60 flex flex-col items-center">
      <h2>{`${crew.car_mark} ${crew.car_model}`}</h2>
      <p>{crew.car_number}</p>
    </div>
  );
};
