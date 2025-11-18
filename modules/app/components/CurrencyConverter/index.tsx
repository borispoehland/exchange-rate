import "server-only";

import { AppError } from "@/components/AppError";
import { AppAwait } from "@/components/AppAwait";
import { Suspense } from "react";
import { getCurrentExchangeRate } from "../../api/current";
import { currencies, ICurrency } from "../../schemas/currency";
import { CurrencyConverterClient } from "./client";
import { AppLoading } from "@/components/AppLoading";

export function CurrencyConverter({
  fromCurrency,
}: {
  fromCurrency: ICurrency;
}) {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppAwait
        promise={getCurrentExchangeRate({
          from: fromCurrency,
          to: currencies.filter((item) => {
            return item !== fromCurrency;
          }),
        })}
      >
        {(data) => {
          if (data.status === "error") {
            return <AppError error={data.error} />;
          }
          return <CurrencyConverterClient data={data.data} />;
        }}
      </AppAwait>
    </Suspense>
  );
}
