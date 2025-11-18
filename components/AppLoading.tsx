import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty'
import { Spinner } from './ui/spinner'

export function AppLoading() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Loading...</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
