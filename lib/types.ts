export type IPartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type IWithGenericParams<T> = {
  params: Promise<T>
}
