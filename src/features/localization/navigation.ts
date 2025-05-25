import { useNavigate, useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { Locale } from './config';
import { addLocaleToPath, getLocaleFromPath, removeLocaleFromPath } from './config';

// Custom hook to get the current locale from the URL
export const useLocale = (): Locale => {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  return getLocaleFromPath(pathname);
};

// Hook to change the locale and navigate to the same page in new locale
export const useChangeLocale = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { i18n } = useTranslation();
  
  const changeLocale = useCallback((newLocale: Locale) => {
    const currentPath = router.state.location.pathname;
    const pathWithoutLocale = removeLocaleFromPath(currentPath);
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale);
    
    i18n.changeLanguage(newLocale);
    navigate({ to: newPath as any });
  }, [navigate, router.state.location.pathname, i18n]);
  
  return changeLocale;
};

// This is similar to your next-intl Link, but adds locale handling
export const getLocalizedPath = (path: string, locale?: Locale): string => {
  if (!path) return '/';
  
  // If locale is provided, use it; otherwise keep the path as is
  if (locale) {
    const pathWithoutLocale = removeLocaleFromPath(path);
    return addLocaleToPath(pathWithoutLocale, locale);
  }
  
  return path;
};

// The LocaleLink component has been moved to components/LocaleLink.tsx
