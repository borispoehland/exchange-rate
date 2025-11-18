import { fetchWithOrigin } from "@/lib/fetch";
import {
  HistoricExchangeRateSchema,
  IHistoricExchangeRateArgs,
} from "../schemas/historic";

// to ensure that no ISO string with hours etc is passed
function getDateString({ isoDate }: { isoDate: string }) {
  return new Date(isoDate).toISOString().slice(0, 10);
}

export function getHistoricExchangeRate(args: IHistoricExchangeRateArgs) {
  const queryParams = new URLSearchParams({
    from: args.from,
    to: args.to.join(","),
  });

  const path = `${getDateString({ isoDate: args.fromDate })}..${getDateString({
    isoDate: args.toDate,
  })}`;

  return fetchWithOrigin(
    `/${path}?${queryParams.toString()}`,
    HistoricExchangeRateSchema,
    { next: { revalidate: 300 } }
  );
}
