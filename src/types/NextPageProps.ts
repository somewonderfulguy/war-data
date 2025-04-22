type DefaultParams = {
  locale: string
}

export type NextPageProps<TParams extends DefaultParams = DefaultParams> = {
  params: Promise<TParams>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}
