import { SUPPORTED_LOCALES, type Locale } from '@/i18n';
import { NextFunction, Request, Response } from 'express';

export const langMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers['accept-language'];
  const lang = header?.slice(0, 2).toLowerCase();

  req.lang = (SUPPORTED_LOCALES.includes(lang ?? '') ? lang : 'id') as Locale;
  next();
};
