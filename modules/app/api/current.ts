import { fetchWithOrigin } from '@/lib/fetch'

import {
  CurrentExchangeRateSchema,
  type ICurrentExchangeRateArgs,
} from '../schemas/current'

export function getCurrentExchangeRate(args: ICurrentExchangeRateArgs) {
  const queryParams = new URLSearchParams({
    from: args.from,
    to: args.to.join(','),
  })

  return fetchWithOrigin(
    `/latest?${queryParams.toString()}`,
    CurrentExchangeRateSchema,
    { next: { revalidate: 300 } }
  )
}
