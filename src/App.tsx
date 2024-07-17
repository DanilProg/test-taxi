import { Suspense } from "react";
import { OrderTaxiPage } from "@/pages/OrderTaxiPage";
import { YMaps } from "@pbe/react-yandex-maps";
import { Toaster } from "@/components/ui/toaster.tsx";

export const App = () => {
  return (
    <YMaps>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderTaxiPage />
      </Suspense>
      <Toaster />
    </YMaps>
  );
};
