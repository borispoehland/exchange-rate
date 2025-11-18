import z from 'zod'

import { CurrencySchema } from './currency'

export const CurrentExchangeRateSchema = z.object({
  amount: z.number(),
  base: CurrencySchema,
  date: z.iso.date(),
  rates: z.partialRecord(CurrencySchema, z.number()),
})

export type ICurrentExchangeRate = z.infer<typeof CurrentExchangeRateSchema>

export const CurrentExchangeRateArgs = z.object({
  from: CurrencySchema,
  to: z.array(CurrencySchema),
})

export type ICurrentExchangeRateArgs = z.infer<typeof CurrentExchangeRateArgs>
