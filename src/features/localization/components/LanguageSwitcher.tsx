import { useRouter } from '@tanstack/react-router';

import { DEFAULT_LOCALE, LOCALES } from '../config';
import type { Locale } from '../config';

// Map of locale codes to display names
const localeNames: Record<Locale, string> = {
  en: 'English',
  jp: '日本語',
  pl: 'Polski',
  ua: 'Українська',
};

// Flag emoji codes for each locale
const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  jp: '🇯🇵',
  pl: '🇵🇱',
  ua: '🇺🇦',
};

// Helper function to get locale from path
function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0] as any)) {
    return segments[0] as Locale;
  }
  return DEFAULT_LOCALE;
}

// Helper to add locale prefix to a path
function addLocalePath(path: string, locale: Locale): string {
  // First remove any existing locale prefix
  const cleanPath = removeLocalePath(path);
  // Then add the new locale prefix
  return `/${locale}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

// Helper to remove locale prefix from a path
function removeLocalePath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0] as any)) {
    return '/' + segments.slice(1).join('/');
  }
  return path;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const currentLocale = getLocaleFromPath(currentPath);
  
  const handleChangeLocale = (newLocale: Locale) => {
    // Don't do anything if we're already using this locale
    if (newLocale === currentLocale) return;
    
    // Create a new path with the selected locale
    const newPath = addLocalePath(currentPath, newLocale);
    
    // Navigate to the new path
    router.navigate({ to: newPath as any });
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-2">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            onClick={() => handleChangeLocale(locale)}
            className={`flex items-center justify-center px-2 py-1 text-sm rounded ${
              currentLocale === locale
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
            aria-label={`Switch to ${localeNames[locale]}`}
          >
            <span className="mr-1">{localeFlags[locale]}</span>
            <span>{localeNames[locale]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
