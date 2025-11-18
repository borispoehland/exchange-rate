'use client'

import { type ComponentProps } from 'react'

import { Input } from './ui/input'

function getNumberInputValue(value: string, isDecimalsAllowed: boolean) {
  let newValue
  if (
    (isDecimalsAllowed ? /^[0-9]*(\.|,)?[0-9]*$/ : /^[1-9][0-9]*$/).test(value)
  ) {
    newValue = value
      .replace(',', '.')
      .replace(/^0+/, '0')
      .replace(/^0([1-9])/, '$1')
      .replace(/^\.$/, '0.')
  } else {
    newValue = ''
  }

  return newValue
}

function isIntermediaryValue(value: string) {
  return (
    !Number(value) ||
    String(value).startsWith('.') ||
    String(value).endsWith('.') ||
    /\.0+$/.test(String(value))
  )
}

function capMaxValue({ value, max }: { value: string; max: number }) {
  const newValue =
    isIntermediaryValue(value) || max < 0
      ? value
      : Math.min(Number(value), max).toString()
  return newValue
}

export function NumberInput({
  isDecimalsAllowed = true,
  max,
  ...props
}: ComponentProps<typeof Input> & {
  max?: number
  isDecimalsAllowed?: boolean
}) {
  return (
    <div className="relative flex grow flex-col">
      <Input
        inputMode={isDecimalsAllowed ? 'decimal' : 'numeric'}
        {...props}
        onChange={(e) => {
          const number = getNumberInputValue(e.target.value, isDecimalsAllowed)
          const value = max ? capMaxValue({ value: number, max }) : number
          props.onChange?.({ ...e, target: { ...e.target, value } })
        }}
      />
    </div>
  )
}
