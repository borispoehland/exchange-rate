import { z } from 'zod'

export const currencies = ['EUR', 'USD', 'CHF'] as const

export const CurrencySchema = z.enum(currencies)
export type ICurrency = z.infer<typeof CurrencySchema>
