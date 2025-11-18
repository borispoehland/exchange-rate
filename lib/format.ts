const format = Intl.NumberFormat('de-DE')

const dateFormat = new Intl.DateTimeFormat('de-DE')

export function formatNumber({ number }: { number: number }) {
  return format.format(number)
}

export function formatDate({ date }: { date: Date }) {
  return dateFormat.format(date)
}
