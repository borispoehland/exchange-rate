import type { z, ZodTypeAny } from 'zod'

import { DigestError } from './error'

type IRequestCallUrl = `/${string}`

export type IAppErrorResponse = { status: 'error'; error: string }

export type IAppResponse<T> = { status: 'success'; data: T } | IAppErrorResponse

export async function fetchWithOrigin<TSchema extends ZodTypeAny>(
  url: IRequestCallUrl,
  schema: TSchema,
  init?: Omit<RequestInit, 'method'>
): Promise<IAppResponse<z.infer<TSchema>>> {
  const isRelative = url.startsWith('/')
  const isApiCall = isRelative && !url.startsWith('/api')
  const finalUrl = isApiCall ? `https://api.frankfurter.app${url}` : url

  const res = await fetch(finalUrl, init)
  const text = await res.text()

  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = text
  }

  const result = schema.safeParse(json)

  if (!result.success) {
    // we could return status: error, but to have centralized error handling in <AppAwait /> we throw it here
    throw new DigestError(result.error.message, {
      request: finalUrl,
      response: res.statusText,
    })
  }

  return { status: 'success' as const, data: result.data }
}
