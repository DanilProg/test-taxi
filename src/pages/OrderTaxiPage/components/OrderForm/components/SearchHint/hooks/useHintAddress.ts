import { useRef, useState } from "react";
import debounce from "lodash.debounce";
import { yandexSyggestInstance } from "@/lib/instance.ts";
import { AxiosRequestConfig } from "axios";
const API_KEY_SUGGEST = "deeae3db-9a31-43f2-a259-cf16648d0fdd";

export interface IHint {
  title?: { text: string };
  subtitle?: { text: string };
}

const suggestValues = async (value: string, config?: AxiosRequestConfig) => {
  const { data } = await yandexSyggestInstance.get(
    `suggest?apikey=${API_KEY_SUGGEST}&text=${value}&results=15`,
    config,
  );
  return data;
};
export const useHintAddress = () => {
  const [hintListAddress, setHintListAddress] = useState<IHint[]>([]);
  const [isHintLoading, setIsHintLoading] = useState<boolean>(true);
  const ref = useRef<AbortController>();
  const updateHintAddress = async (value: string) => {
    ref.current?.abort();
    ref.current = new AbortController();
    if (!value) {
      setHintListAddress([]);
      return;
    }
    setIsHintLoading(true);
    const { results = [] } = await suggestValues(value, {
      signal: ref.current?.signal,
    });
    setIsHintLoading(false);
    setHintListAddress(results);
  };
  const [getDebouncedHints] = useState(() => debounce(updateHintAddress, 500));

  return {
    hintListAddress,
    getDebouncedHints,
    getHints: updateHintAddress,
    isHintLoading,
  };
};
