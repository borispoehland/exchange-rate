'use client'

import { useState } from 'react'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

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

import { currencies } from '../../schemas/currency'
import type { IHistoricExchangeRate } from '../../schemas/historic'

const chartConfig = {
  USD: {
    label: 'USD',
    color: 'var(--chart-2)',
  },
  EUR: {
    label: 'EUR',
    color: 'var(--chart-1)',
  },
  CHF: {
    label: 'CHF',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig

export function CurrencyHistoryClient({
  data,
}: {
  data: IHistoricExchangeRate
}) {
  const total = currencies.reduce((acc: Record<string, number>, curr) => {
    const price = Object.values(data.rates).at(-1)?.[curr] ?? 0
    if (price) {
      acc[curr] = price
    }
    return acc
  }, {})

  const [activeCharts, setActiveCharts] = useState<string[]>(Object.keys(total))

  const chartData = Object.entries(data.rates).map(([key, value]) => {
    return { ...value, date: key }
  })

  return (
    <Card className="m-4 py-1 md:py-0">
      <CardHeader className="flex flex-col gap-0 border-b p-0 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col justify-center gap-1 p-4">
          <CardTitle>Exchange rate development</CardTitle>
          <CardDescription>
            Shows the development from{' '}
            {formatDate({ date: new Date(data.start_date) })} to{' '}
            {formatDate({ date: new Date(data.end_date) })}
          </CardDescription>
        </div>
        <div className="flex max-md:w-full">
          {Object.keys(total).map((key) => {
            const chart = key as keyof typeof chartConfig
            const isActive = activeCharts.includes(chart)
            return (
              <button
                key={chart}
                data-active={isActive}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l md:border-t-0 md:border-l md:px-8 md:py-6"
                onClick={() =>
                  setActiveCharts((prev) => {
                    return [
                      ...prev.filter((item) => item !== chart),
                      ...(isActive ? [] : [chart]),
                    ]
                  })
                }
              >
                <span
                  className="text-xs"
                  style={{ color: chartConfig[chart].color }}
                >
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold md:text-3xl">
                  {formatNumber({ number: total[key as keyof typeof total] })}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 md:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
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
            {activeCharts.map((chart) => {
              return (
                <Line
                  key={chart}
                  dataKey={chart}
                  type="monotone"
                  stroke={`var(--color-${chart})`}
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
