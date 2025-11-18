import 'server-only'

import type { ComponentProps } from 'react'

import { CurrencyConverter } from './CurrencyConverter'
import { CurrencyHistory } from './CurrencyHistory'

export function CurrencyPage(
  props: ComponentProps<typeof CurrencyConverter> &
    ComponentProps<typeof CurrencyHistory>
) {
  return (
    <main className="flex flex-col gap-4 py-4">
      <CurrencyConverter {...props} />
      <CurrencyHistory {...props} />
    </main>
  )
}
