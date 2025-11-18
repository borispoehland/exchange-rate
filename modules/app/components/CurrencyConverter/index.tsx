import 'server-only'

import { Suspense } from 'react'

import { AppAwait } from '@/components/AppAwait'
import { AppError } from '@/components/AppError'
import { AppLoading } from '@/components/AppLoading'

import { getCurrentExchangeRate } from '../../api/current'
import { currencies, type ICurrency } from '../../schemas/currency'
import { CurrencyConverterClient } from './client'

export function CurrencyConverter({
  fromCurrency,
}: {
  fromCurrency: ICurrency
}) {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppAwait
        promise={getCurrentExchangeRate({
          from: fromCurrency,
          to: currencies.filter((item) => {
            return item !== fromCurrency
          }),
        })}
      >
        {(data) => {
          if (data.status === 'error') {
            return <AppError error={data.error} />
          }
          return <CurrencyConverterClient data={data.data} />
        }}
      </AppAwait>
    </Suspense>
  )
}
