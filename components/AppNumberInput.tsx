'use client'

import { useState, type ComponentProps } from 'react'

import { formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

import { Input, inputClass } from './ui/input'

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

export function AppNumberInput({
  isDecimalsAllowed = true,
  max,
  className,
  ...props
}: ComponentProps<typeof Input> & {
  max?: number
  isDecimalsAllowed?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <Input
        inputMode={isDecimalsAllowed ? 'decimal' : 'numeric'}
        {...props}
        onChange={(e) => {
          const number = getNumberInputValue(e.target.value, isDecimalsAllowed)
          const value = max ? capMaxValue({ value: number, max }) : number
          props.onChange?.({ ...e, target: { ...e.target, value } })
        }}
        onFocus={(e) => {
          props.onFocus?.(e)
          setIsFocused(true)
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
          setIsFocused(false)
        }}
        className={cn(!isFocused && 'text-transparent', className)}
      />
      {props.value && (
        <div
          className={cn(
            inputClass,
            'pointer-events-none absolute inset-0 flex h-auto items-center',
            className,
            isFocused && 'text-transparent'
          )}
        >
          {formatNumber({ number: Number(props.value) })}
        </div>
      )}
    </div>
  )
}
