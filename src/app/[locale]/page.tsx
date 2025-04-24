import { getTranslations } from 'next-intl/server'

import { Button } from '~/components/shadcn/formControls/button'
import { Link } from '~/features/localization/navigation'

const HomePage = async () => {
  const t = await getTranslations('auth')

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Button type="button" variant="outline" asChild>
        <Link href="/login">{t('signIn')}</Link>
      </Button>
      <Button type="button" variant="outline" asChild>
        <Link href="/develop">Developer&apos;s page</Link>
      </Button>
    </main>
  )
}

export default HomePage
