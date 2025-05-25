// Similar to your next-intl routing.ts
export const LOCALES = ['en', 'jp', 'pl', 'ua'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const getLocaleFromPath = (path: string): Locale => {
  const pathSegments = path.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  return LOCALES.includes(firstSegment as Locale) 
    ? (firstSegment as Locale) 
    : DEFAULT_LOCALE;
};

export const removeLocaleFromPath = (path: string): string => {
  const pathSegments = path.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (LOCALES.includes(firstSegment as Locale)) {
    return '/' + pathSegments.slice(1).join('/');
  }
  
  return path;
};

export const addLocaleToPath = (path: string, locale: Locale): string => {
  const cleanPath = removeLocaleFromPath(path);
  const pathWithoutLeadingSlash = cleanPath.startsWith('/') 
    ? cleanPath.slice(1) 
    : cleanPath;
  
  return `/${locale}/${pathWithoutLeadingSlash}`;
};
