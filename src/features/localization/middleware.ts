import { Navigate, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import { DEFAULT_LOCALE, LOCALES } from './config';

/**
 * Detect if a URL needs to be redirected to include the locale prefix
 * Returns the redirected URL or null if no redirect is needed
 */
export const redirectToLocalizedRoute = (url: string): string | null => {
  // Parse the URL path
  const pathname = new URL(url, 'http://localhost').pathname;
  const segments = pathname.split('/').filter(Boolean);

  // If URL doesn't start with a valid locale, redirect to default locale
  if (segments.length === 0 || !LOCALES.includes(segments[0] as any)) {
    // Redirect to the default locale + current path
    return `/${DEFAULT_LOCALE}${pathname}`;
  }
  
  // URL already has a valid locale prefix, no redirection needed
  return null;
};

/**
 * Creates a root route with middleware-like locale redirection
 * This is similar to next-intl's middleware functionality
 */
export const createLocaleAwareRoot = () => {
  return createRootRouteWithContext<{ queryClient: QueryClient }>()({    
    beforeLoad: ({ location }) => {
      const redirectTo = redirectToLocalizedRoute(location.href);
      if (redirectTo) {
        throw new Navigate({ to: redirectTo });
      }
    }
  });
};
