import { Locale } from '@/i18n/index';

declare global {
  namespace Express {
    interface Request {
      lang: Locale;
    }
  }
}

export {};
