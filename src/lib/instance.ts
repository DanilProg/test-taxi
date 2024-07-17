import axios from "axios";

export const yandexGeocodeInstance = axios.create({
  baseURL: "https://geocode-maps.yandex.ru/1.x/",
});
export const yandexSyggestInstance = axios.create({
  baseURL: "https://suggest-maps.yandex.ru/v1/",
});
