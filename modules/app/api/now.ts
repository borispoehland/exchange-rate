import { cacheLife } from 'next/cache'

export async function getNow() {
  'use cache'
  cacheLife({ revalidate: 300 })
  return new Date()
}
