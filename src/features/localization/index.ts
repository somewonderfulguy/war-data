// Export types
export type { Locale } from './config';

// Export constants
export { DEFAULT_LOCALE, LOCALES } from './config';

// Export utilities
export { 
  getLocaleFromPath, 
  removeLocaleFromPath, 
  addLocaleToPath 
} from './config';

// Export navigation utilities
export { 
  useLocale, 
  useChangeLocale, 
  getLocalizedPath 
} from './navigation';

// Export i18n instance
export { default as i18n } from './i18n';

// Export components
export { LanguageSwitcher } from './components/LanguageSwitcher';
