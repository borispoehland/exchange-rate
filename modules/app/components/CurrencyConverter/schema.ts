import z from 'zod'

export const currencyConverterSchema = z.object({
  amount: z.string().min(1, 'Please enter a number'),
})

export type ICurrencyConverterSchema = z.infer<typeof currencyConverterSchema>
