import { ComponentProps } from "react";
import "server-only";
import { CurrencyConverter } from "./CurrencyConverter";
import { CurrencyHistory } from "./CurrencyHistory";

export function CurrencyPage(
  props: ComponentProps<typeof CurrencyConverter> &
    ComponentProps<typeof CurrencyHistory>
) {
  return (
    <main className="py-4 flex flex-col gap-4">
      <CurrencyConverter {...props} />
      <CurrencyHistory {...props} />
    </main>
  );
}
