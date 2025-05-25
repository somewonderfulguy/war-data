import { Outlet, createFileRoute } from '@tanstack/react-router';

import { DEFAULT_LOCALE, LOCALES } from '../features/localization/config';
import type { Locale } from '../features/localization/config';

// Route for handling locale-prefixed paths like /en, /jp, etc.
export const Route = createFileRoute('/$locale')({
  // Validate the locale parameter
  parseParams: ({ locale }) => {
    // If locale is valid, return it
    if (LOCALES.includes(locale as Locale)) {
      return { locale: locale as Locale };
    }
    // Otherwise, return the default locale
    return { locale: DEFAULT_LOCALE };
  },
  
  // Define the expected shape of the params
  validateSearch: (): Record<string, never> => ({}),
  
  // Component for the locale-aware route
  component: LocaleLayout,
});

// Locale-aware layout that renders child routes
function LocaleLayout() {
  // Simply render all the children below this layout
  return <Outlet />;
}
