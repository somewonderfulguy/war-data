import { Link, useRouter } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALES } from '../config';
import type { Locale } from '../config';

interface LocaleLinkProps extends Omit<LinkProps, 'children'> {
  children: ReactNode;
}

/**
 * A Link component that preserves the current locale when navigating
 * This is similar to the next-intl's Link component
 */
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

export function LocaleLink({ to, children, ...rest }: LocaleLinkProps) {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const currentLocale = getLocaleFromPath(currentPath);
  
  // Create a modified 'to' property with locale prefixed
  let localizedPath;
  
  if (typeof to === 'string') {
    // Add locale prefix to the path
    localizedPath = addLocalePath(to, currentLocale);
  } else {
    // For objects and other types, pass through unchanged
    localizedPath = to;
  }
  
  return (
    <Link to={localizedPath as any} {...rest}>
      {children}
    </Link>
  );
}
