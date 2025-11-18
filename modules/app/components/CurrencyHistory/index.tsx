import 'server-only'

import { Suspense } from 'react'

import { AppAwait } from '@/components/AppAwait'
import { AppError } from '@/components/AppError'
import { AppLoading } from '@/components/AppLoading'

import { getHistoricExchangeRate } from '../../api/historic'
import { getNow } from '../../api/now'
import { currencies, type ICurrency } from '../../schemas/currency'
import { CurrencyHistoryClient } from './client'

export function CurrencyHistory({ fromCurrency }: { fromCurrency: ICurrency }) {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppAwait
        promise={getNow().then((now) => {
          const twoWeeksAgo = new Date(now)
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

          return getHistoricExchangeRate({
            from: fromCurrency,
            to: currencies.filter((item) => {
              return item !== fromCurrency
            }),
            fromDate: twoWeeksAgo.toISOString(),
            toDate: now.toISOString(),
          })
        })}
      >
        {(data) => {
          if (data.status === 'error') {
            return <AppError error={data.error} />
          }
          return <CurrencyHistoryClient data={data.data} />
        }}
      </AppAwait>
    </Suspense>
  )
}
