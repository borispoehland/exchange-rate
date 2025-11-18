import type { ICurrency } from '@/modules/app/schemas/currency'

export function getMetaTitle({ currency }: { currency: ICurrency }) {
  return `Convert ${currency}`
}
