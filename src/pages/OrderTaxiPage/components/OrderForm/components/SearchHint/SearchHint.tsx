import { Input, InputProps } from "@/components/ui/input.tsx";
import React, { useEffect, useState } from "react";
import { IHint, useHintAddress } from "./hooks";
import { HintListLayout, Hint, HintSkeleton } from "./components";

export const SearchHint = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    selectAddress: (title: string, subtitle: string) => void;
    value?: string;
  }
>(({ selectAddress, value = "", ...props }, ref) => {
  const [isSearchView, setIsSearchView] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { hintListAddress, getDebouncedHints, getHints, isHintLoading } =
    useHintAddress();
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsSearchView(false);
      setSearchValue("");
    });
  }, []);

  const onClickHint = (title: string, subtitle: string) => {
    selectAddress(title, subtitle);
  };
  const renderContent = (isHintLoading: boolean, hintListAddress: IHint[]) => {
    if (isHintLoading) {
      return Array.from({ length: 7 }).map((_, i) => <HintSkeleton key={i} />);
    }
    if (hintListAddress.length === 0) {
      return (
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          Адрес не найден
        </div>
      );
    }
    return hintListAddress.map(({ subtitle, title }) => (
      <Hint
        key={title?.text || "" + subtitle?.text || ""}
        selectAddress={onClickHint}
        subtitle={subtitle?.text || ""}
        title={title?.text || ""}
      />
    ));
  };
  return (
    <div
      className="w-full relative"
      ref={ref}
      onClick={(event) => event.stopPropagation()}
    >
      <Input
        {...props}
        value={isSearchView ? searchValue : value}
        onFocus={async (e) => {
          props.onFocus?.(e);
          await getHints(value);
          setSearchValue(value);
          setIsSearchView(true);
        }}
        onChange={async (e) => {
          setSearchValue(e.target.value);
          await getDebouncedHints(e.target.value);
        }}
      />
      {(hintListAddress.length > 0 || !!searchValue) && isSearchView && (
        <div
          className="absolute mt-0.5 w-full"
          onClick={() => setIsSearchView(false)}
        >
          <HintListLayout className="w-full absolute bg-white border-[1px] border-black z-10">
            {renderContent(isHintLoading, hintListAddress)}
          </HintListLayout>
        </div>
      )}
    </div>
  );
});
