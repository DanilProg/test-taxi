import { yandexGeocodeInstance } from "@/lib/instance.ts";

const API_KEY = "b6d3866b-5aa9-4399-90b7-a3ea82c99c66";
export const geocodeCord = async (value: number[]) => {
  const { data } = await yandexGeocodeInstance.get(
    `/?apikey=${API_KEY}&geocode=${value.join(",")}&format=json`,
  );

  return data;
};
export const geocodeAddress = async (value: string) => {
  const { data } = await yandexGeocodeInstance.get(
    `/?apikey=${API_KEY}&geocode=${value.split(" ").join("+")}&format=json`,
  );

  return data;
};
