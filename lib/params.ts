import type { IAppResponse } from './fetch'
import type { IWithGenericParams } from './types'

export async function awaitParams<T>({
  params,
}: IWithGenericParams<T>): Promise<IAppResponse<T>> {
  return params.then((params) => {
    return { status: 'success' as const, data: params }
  })
}
