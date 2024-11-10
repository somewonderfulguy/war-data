import type { Metadata } from 'next'

import { getScopedI18n } from '@/locales/server'

export async function generateMetadata() {
  const t = await getScopedI18n('about')
  return {
    title: t('title')
  } satisfies Metadata
}

export default async function AboutPage() {
  const t = await getScopedI18n('about')
  return (
    <main>
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <div className="mt-5" />
    </main>
  )
}
