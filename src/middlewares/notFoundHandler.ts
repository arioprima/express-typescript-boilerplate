import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { t } from '@/i18n';

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next(AppError.notFound(t('common.not_found', _req.lang)));
}
