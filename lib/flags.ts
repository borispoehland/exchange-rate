import type { StaticImport } from 'next/dist/shared/lib/get-img-props'

import type { ICurrency } from '@/modules/app/schemas/currency'
import ChfIcon from '@/public/CHF.svg'
import EurIcon from '@/public/EUR.svg'
import UsdIcon from '@/public/USD.svg'

export const flagsMappers: Record<ICurrency, { icon: StaticImport }> = {
  EUR: {
    icon: EurIcon,
  },
  USD: {
    icon: UsdIcon,
  },
  CHF: {
    icon: ChfIcon,
  },
}
