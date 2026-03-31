import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@/utils/AppError';
import logger from '@/config/logger';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // --- 1. Zod Validation Error ---
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path
        .map(String)
        .filter((p) => p !== 'body' && p !== 'params' && p !== 'query')
        .join('.'),
      message: issue.message,
    }));

    res.status(422).json({
      success: false,
      message: 'Validasi gagal',
      errors,
    });
    return;
  }

  // --- 2. AppError (error yang kita throw sendiri) ---
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // --- 3. Error tidak terduga (bug) ---
  logger.error({ err }, 'Unexpected Error');

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    ...(process.env['NODE_ENV'] === 'development' && { stack: err.stack }),
  });
}
