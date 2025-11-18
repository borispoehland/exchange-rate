import { getMetaTitle } from "@/lib/metadata";
import { CurrencyPage } from "@/modules/app/components/CurrencyPage";

const defaultCurrency = "USD";

export const metadata = {
  title: getMetaTitle({ currency: defaultCurrency }),
};

export default function Home() {
  return <CurrencyPage fromCurrency={defaultCurrency} />;
}
