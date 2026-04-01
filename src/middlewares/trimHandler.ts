import { Request, Response, NextFunction } from 'express';

export const trimHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.body) {
    req.body = deepTrim(req.body);
  }
  next();
};

const deepTrim = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value.trim();
  } else if (Array.isArray(value)) {
    return value.map(deepTrim);
  } else if (typeof value === 'object' && value !== null) {
    const result: Record<string, unknown> = {};
    for (const key in value) {
      result[key] = deepTrim((value as Record<string, unknown>)[key]);
    }
    return result;
  }
  return value;
};
