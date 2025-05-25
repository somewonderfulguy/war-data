import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/$lang/perpetua')({
  component: PerpetuaPage,
})

function PerpetuaPage() {
  const { t } = useTranslation()
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
      <h1 className="text-4xl mb-4">{t('welcome')}</h1>
      <p>Perpetua</p>
    </div>
  )
}
