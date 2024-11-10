'use client'
import { createI18nClient } from 'next-international/client'
import Locale from 'intl-locale-textinfo-polyfill'

const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
  en: () => import('./en'),
  he: () => import('./he'),
  jp: () => import('./jp'),
  pl: () => import('./pl'),
  ua: () => import('./ua')
})

const useIsRtl = () => {
  const locale = useCurrentLocale()
  const { direction: dir } = new Locale(String(locale)).textInfo
  return dir === 'rtl'
}

export { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale, useIsRtl }
