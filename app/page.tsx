import type { Metadata } from 'next'

import { getMetaIcon, getMetaTitle } from '@/lib/metadata'
import { CurrencyPage } from '@/modules/app/components/CurrencyPage'

const defaultCurrency = 'USD'

export const metadata: Metadata = {
  title: getMetaTitle({ currency: defaultCurrency }),
  icons: getMetaIcon({ currency: defaultCurrency }),
}

export default function Home() {
  return <CurrencyPage fromCurrency={defaultCurrency} />
}
