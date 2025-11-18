'use client'

import { useState } from 'react'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { formatDate, formatNumber } from '@/lib/format'

import type { ICurrency } from '../../schemas/currency'
import type { IHistoricExchangeRate } from '../../schemas/historic'

const chartConfig = {
  USD: {
    label: 'USD',
    color: 'var(--chart-1)',
  },
  EUR: {
    label: 'EUR',
    color: 'var(--chart-3)',
  },
  CHF: {
    label: 'CHF',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function CurrencyHistoryClient({
  data,
}: {
  data: IHistoricExchangeRate
}) {
  const values = Object.values(data.rates)

  const total = Object.keys(values[0]).reduce(
    (acc: Record<string, number>, curr) => {
      const price = values[values.length - 1]?.[curr as ICurrency] ?? 0
      if (price) {
        acc[curr] = price
      }
      return acc
    },
    {}
  )

  const [activeCharts, setActiveCharts] = useState<string[]>(Object.keys(total))

  const chartData = Object.entries(data.rates).map(([key, value]) => {
    return { ...value, date: key }
  })

  return (
    <Card className="m-4 py-1 md:py-0">
      <CardHeader className="flex flex-col gap-0 border-b p-0 md:flex-row md:items-center">
        <div className="flex grow flex-col justify-center gap-1 p-4">
          <CardTitle>Exchange rate development</CardTitle>
          <CardDescription className="text-balance">
            Shows the development from{' '}
            {formatDate({ date: new Date(data.start_date) })} to{' '}
            {formatDate({ date: new Date(data.end_date) })}
          </CardDescription>
        </div>
        <div className="flex max-md:w-full">
          {Object.keys(total).map((item) => {
            const typedKey = item as keyof typeof chartConfig
            const isActive = activeCharts.includes(typedKey)
            return (
              <Button
                key={typedKey}
                data-active={isActive}
                variant={null}
                size={null}
                className="data-[active=true]:bg-muted/40 grow flex-col gap-1 rounded-none border-t px-6 py-4 text-left even:border-l md:border-t-0 md:border-l md:px-8 md:py-6"
                onClick={() =>
                  setActiveCharts((prev) => {
                    return [
                      ...prev.filter((item) => item !== typedKey),
                      ...(isActive ? [] : [typedKey]),
                    ]
                  })
                }
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: chartConfig[typedKey].color }}
                >
                  {chartConfig[typedKey].label}
                </span>
                <span className="text-lg leading-none font-bold md:text-3xl">
                  {formatNumber({ number: total[typedKey] })}
                </span>
              </Button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 **:outline-none md:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={30}
              domain={[
                (dataMin: number) => dataMin * 0.95,
                (dataMax: number) => dataMax * 1.05,
              ]}
              tickFormatter={(value) => {
                return Intl.NumberFormat('de-DE', {
                  maximumFractionDigits: 2,
                }).format(value)
              }}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return formatDate({ date: new Date(value) })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return formatDate({ date: new Date(value) })
                  }}
                />
              }
            />
            {activeCharts.map((item) => {
              return (
                <Line
                  key={item}
                  dataKey={item}
                  type="monotone"
                  stroke={`var(--color-${item})`}
                  strokeWidth={2}
                  dot={false}
                />
              )
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
