import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/$locale/perpetua')({
  component: PerpetuaPage,
});

function PerpetuaPage() {
  const { t } = useTranslation();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t('perpetua.title')}</h1>
      <p className="mt-2">{t('perpetua.description')}</p>
    </div>
  );
}
