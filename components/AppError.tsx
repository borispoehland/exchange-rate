import { CircleAlert } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty'

export function AppError({ error }: { error: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleAlert />
        </EmptyMedia>
        <EmptyTitle>An error occured</EmptyTitle>
        <EmptyDescription>{error}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
