import z from "zod";
import { CurrencySchema } from "./currency";
import { CurrentExchangeRateArgs } from "./current";

export const HistoricExchangeRateSchema = z.object({
  amount: z.number(),
  base: CurrencySchema,
  start_date: z.iso.date(),
  end_date: z.iso.date(),
  rates: z.record(z.iso.date(), z.partialRecord(CurrencySchema, z.number())),
});

export type IHistoricExchangeRate = z.infer<typeof HistoricExchangeRateSchema>;

export const HistoricExchangeRateArgs = z.intersection(
  CurrentExchangeRateArgs,
  z.object({
    fromDate: z.iso.date(),
    toDate: z.iso.date(),
  })
);

export type IHistoricExchangeRateArgs = z.infer<
  typeof HistoricExchangeRateArgs
>;
