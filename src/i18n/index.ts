import id from './locales/id.json';
import en from './locales/en.json';

const locales = { id, en } as const;

export type Locale = keyof typeof locales;
export const SUPPORTED_LOCALES = Object.keys(locales);

export const t = (key: string, lang: Locale = 'id'): string => {
  const keys = key.split('.');
  let result: unknown = locales[lang];

  for (const k of keys) {
    if (typeof result === 'object' && result !== null && k in result) {
      result = result[k as keyof typeof result];
    } else {
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
};
