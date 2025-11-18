import type { ICurrency } from '@/modules/app/schemas/currency'

import { HOST } from './host'

export function getMetaTitle({ currency }: { currency: ICurrency }) {
  return `Convert ${currency}`
}

export function getMetaIcon({ currency }: { currency: ICurrency }) {
  return {
    icon: {
      url: `${HOST}/${currency}.svg`,
      type: 'image/svg+xml',
    },
  }
}
