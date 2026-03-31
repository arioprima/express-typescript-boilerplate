import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

interface ParsedRequest {
  body?: unknown;
  params?: unknown;
  query?: unknown;
}

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      }) as ParsedRequest; 

      if (validatedData.body) req.body = validatedData.body;
      if (validatedData.params) req.params = validatedData.params as Request['params'];
      if (validatedData.query) req.query = validatedData.query as Request['query'];

      next();
    } catch (error) {
      next(error);
    }
  };
}
