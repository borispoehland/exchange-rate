import { getMetaTitle } from "@/lib/metadata";
import { CurrencyConverter } from "@/modules/app/components/CurrencyConverter";
import { CurrencyHistory } from "@/modules/app/components/CurrencyHistory";

const defaultCurrency = "USD";

export const metadata = {
  title: getMetaTitle({ currency: defaultCurrency }),
};

export default function Home() {
  return (
    <>
      <CurrencyConverter fromCurrency={defaultCurrency} />
      <CurrencyHistory fromCurrency={defaultCurrency} />
    </>
  );
}
