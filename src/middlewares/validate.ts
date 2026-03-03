import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

/**
 * Middleware untuk validasi request menggunakan Zod schema.
 *
 * Bisa validasi: body, params, dan query sekaligus.
 *
 * @example
 * // Di route:
 * router.post('/register', validate(registerSchema), authController.register);
 */
export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(error);
      }
    }
  };
}
