import { Input, InputProps } from "@/components/ui/input.tsx";
import React, { ReactNode, useEffect, useState } from "react";

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    isSearch: boolean;
    searchContent: ReactNode;
    searchValue: string;
  }
>(({ isSearch, searchContent, searchValue, value, ...props }, ref) => {
  const [isSearchView, setIsSearchView] = useState(false);
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsSearchView(false);
    });
  }, []);
  return (
    <div
      className="w-full relative"
      ref={ref}
      onClick={(event) => event.stopPropagation()}
    >
      <Input
        {...props}
        value={isSearchView ? searchValue : value}
        onFocus={(e) => {
          props.onFocus?.(e);
          setIsSearchView(true);
        }}
      />
      {isSearch && isSearchView && (
        <div
          className="absolute mt-0.5 w-full"
          onClick={() => setIsSearchView(false)}
        >
          {searchContent}
        </div>
      )}
    </div>
  );
});
