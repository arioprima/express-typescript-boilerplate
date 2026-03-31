import { Response } from 'express';

/**
 * Response helper — memastikan semua response punya format yang sama.
 *
 * Format standar:
 * {
 *   success: boolean,
 *   message: string,
 *   data?: any,
 *   meta?: { page, limit, total, totalPages }
 * }
 */

// --- Sukses (200) ---
export const sendSuccess = (res: Response, message: string, data?: unknown) => {
  res.status(200).json({ success: true, message, data });
};

// --- Created (201) ---
export const sendCreated = (res: Response, message: string, data?: unknown) => {
  res.status(201).json({ success: true, message, data });
};

// --- Sukses dengan Pagination (200) ---
interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const sendPaginated = (
  res: Response,
  message: string,
  data: unknown,
  meta: PaginationMeta
) => {
  res.status(200).json({ success: true, message, data, meta });
};
