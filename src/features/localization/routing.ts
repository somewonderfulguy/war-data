import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'jp', 'pl', 'ua'],
  defaultLocale: 'en'
})
