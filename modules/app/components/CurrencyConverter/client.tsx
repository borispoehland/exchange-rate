'use client'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftRight, ChevronDown } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { NumberInput } from '@/components/AppNumberInput'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { formatDate, formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

import { currencies } from '../../schemas/currency'
import type { ICurrentExchangeRate } from '../../schemas/current'
import {
  currencyConverterSchema,
  type ICurrencyConverterSchema,
} from './schema'

const MAX_VALUE = 1_000_000

const nuggets = [100, 1000, 10_000]

export function CurrencyConverterClient({
  data,
}: {
  data: ICurrentExchangeRate
}) {
  const form = useForm<ICurrencyConverterSchema>({
    resolver: zodResolver(currencyConverterSchema),
    defaultValues: {
      amount: '',
    },
  })

  const values = useWatch({ control: form.control })

  const amount = Number(values?.amount) || 1

  return (
    <div className="mx-auto grid w-full max-w-[900px] items-center md:grid-cols-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ArrowLeftRight />
          </EmptyMedia>
          <EmptyTitle>Convert {data.base}</EmptyTitle>
        </EmptyHeader>
        <EmptyContent className="max-w-[280px]">
          <Form {...form}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                    <InputGroupInput asChild>
                      <FormControl>
                        <NumberInput
                          placeholder={`0 - ${formatNumber({
                            number: MAX_VALUE,
                          })}`}
                          max={MAX_VALUE}
                          {...field}
                        />
                      </FormControl>
                    </InputGroupInput>
                    <InputGroupAddon align="inline-end" className="pr-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span>{data.base}</span>
                            <ChevronDown />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {currencies.map((item) => {
                            return (
                              <DropdownMenuItem key={item} asChild>
                                <Link
                                  href={`/${item}`}
                                  className={cn(
                                    item === data.base && 'font-bold'
                                  )}
                                >
                                  {item}
                                </Link>
                              </DropdownMenuItem>
                            )
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="flex items-center gap-2">
                    {nuggets.map((item) => {
                      return (
                        <Badge key={item} asChild>
                          <Button
                            variant={null}
                            size={null}
                            onClick={() => {
                              field.onChange(item)
                            }}
                          >
                            {formatNumber({ number: item })}
                          </Button>
                        </Badge>
                      )
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </EmptyContent>
      </Empty>
      <div className="flex flex-col items-center text-sm max-md:mx-auto max-md:w-2/3 max-md:border-t max-md:pt-4">
        <span className="text-muted-foreground">
          As of {formatDate({ date: new Date(data.date) })}:
        </span>
        {Object.keys(data.rates).map((item) => {
          const rate = data.rates[item as keyof typeof data.rates] ?? 0

          return (
            <div key={item}>
              <span className="font-medium">
                {formatNumber({ number: amount })} {data.base}
              </span>{' '}
              equals{' '}
              <span className="font-medium">
                {formatNumber({
                  number: rate * amount,
                })}{' '}
                {item}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
