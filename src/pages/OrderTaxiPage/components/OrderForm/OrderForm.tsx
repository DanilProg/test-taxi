import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  useToast,
} from "@/components/ui";
import { useUserCord } from "./hooks";
import { geocodeAddress } from "@/services/geocodeService.ts";
import { ICrew } from "@/contracts/contracts.ts";
import { callCrew, getCrews } from "@/services/crewsService.ts";
import {
  TaxiListLayout,
  TaxiItem,
  OrderMap,
  SearchHint,
  SelectCrew,
} from "./components";

const orderFormSchema = z.object({
  fromAddress: z.string({ message: "Это поле обязательное" }),
  fromCord: z.array(z.number(), z.number()),
  crewId: z.number().optional(),
});

export const OrderForm = () => {
  const { userCord, changeUserCord } = useUserCord();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {},
  });
  const fromCord = form.getValues()?.fromCord;
  const [crewList, setCrewList] = useState<ICrew[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getCrewList = async (fromCord: number[]) => {
      const {
        data: { crews_info },
      } = await getCrews(fromCord);
      setCrewList(crews_info);
      form.setValue("crewId", crews_info[0].crew_id);
    };
    if (fromCord?.length > 0) {
      getCrewList(fromCord);
    } else {
      setCrewList([]);
    }
  }, [form, fromCord]);
  const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
    try {
      setIsLoading(true);
      await callCrew();
      setIsLoading(false);
      form.reset();
      toast({
        title: `Такси по адресу ${values.fromAddress} успешно вызвано`,
        variant: "success",
      });
    } catch (e) {
      toast({
        title: `Произошла ошибка при вызове такси, попробуйте еще раз`,
        variant: "destructive",
      });
    }
  };

  const hasErrors = Object.keys(form.formState.errors).length > 0;
  const selectAddress = async (title: string, subtitle: string) => {
    const { response } = await geocodeAddress(`${title} ${subtitle}`);
    const cord =
      response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
        " ",
      );
    changeUserCord({ latitude: +cord[1], longitude: +cord[0] });
    form.setValue("fromCord", [+cord[1], +cord[0]]);
    form.setValue("fromAddress", `${title} ${subtitle}`);
    form.trigger();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-form grid-rows-form gap-4 h-full"
      >
        <FormField
          control={form.control}
          name="fromAddress"
          render={({ field }) => (
            <FormItem className="grid grid-cols-formItem items-baseline gap-x-4">
              <FormMessage className="col-start-2" />
              <FormLabel className="justify-self-end ">Откуда</FormLabel>
              <FormControl>
                <SearchHint value={field.value} selectAddress={selectAddress} />
              </FormControl>
            </FormItem>
          )}
        />
        <div></div>
        {
          <FormField
            control={form.control}
            name="crewId"
            render={({ field }) => {
              const crew = crewList.find(
                (crew) => crew.crew_id === field.value,
              );
              return (
                <FormItem className="grid grid-cols-formItem items-baseline gap-4">
                  <FormLabel className="justify-self-end">
                    Подходящий экипаж
                  </FormLabel>
                  {crew && <SelectCrew crew={crew} />}
                </FormItem>
              );
            }}
          />
        }
        <div></div>
        <FormField
          control={form.control}
          name="fromCord"
          render={({ field }) => (
            <div className="h-[90%] w-full overflow-hidden">
              <OrderMap
                setAddress={(address) => {
                  form.setValue("fromAddress", address);
                  form.trigger();
                }}
                setCoords={(coords) => field.onChange(coords)}
                userCord={userCord}
                coords={field.value}
              />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="crewId"
          render={({ field }) => (
            <TaxiListLayout className="w-full h-[90%]">
              {crewList.map((crew) => {
                return (
                  <TaxiItem
                    key={crew.crew_id}
                    onSelectCrew={() => field.onChange(crew.crew_id)}
                    carName={`${crew.car_mark} ${crew.car_model}`}
                    color={crew.car_color}
                    distance={crew.distance}
                  />
                );
              })}
            </TaxiListLayout>
          )}
        />
        <div className="col-start-1 col-end-3 flex justify-center">
          <Button
            disabled={hasErrors || isLoading}
            size="lg"
            variant="outline"
            type="submit"
            className="w-1/2"
          >
            Заказать
          </Button>
        </div>
      </form>
    </Form>
  );
};
