import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/$lang/login')({
  component: LoginPage,
})

function LoginPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
      <h1 className="mb-4 text-4xl">{t('login')}</h1>
    </div>
  )
}
