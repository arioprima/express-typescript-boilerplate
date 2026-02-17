import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { z } from 'zod';
import logger from '@/config/logger';
import { requestLogger } from '@/middlewares/requestLogger';
import { notFoundHandler } from '@/middlewares/notFoundHandler';
import { errorHandler } from '@/middlewares/errorHandler';
import { validate } from '@/middlewares/validate';
import { trimHandler } from './middlewares/trimHandler';

const app = express();
const port = process.env['PORT'] || 3000;

// --- Security Headers (helmet) ---
app.use(helmet());

// --- CORS ---
app.use(
  cors({
    origin: process.env['CORS_ORIGIN'] || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// --- Body Parsers ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(trimHandler);

// --- Request Logger (log setiap HTTP request) ---
app.use(requestLogger);

// --- Routes ---
app.get('/', (_, res) => {
  res.json({ success: true, message: 'ShiftKu API is running 🚀' });
});

// ==========================================
// TEST ROUTE — hapus nanti setelah paham
// ==========================================
const testSchema = z.object({
  body: z.object({
    email: z.email('Email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    full_name: z.string().min(1, 'Nama wajib diisi'),
  }),
});
app.post('/test-validate', validate(testSchema), (req, res) => {
  res.json({ success: true, data: req.body });
});
// ==========================================

// TODO: Tambahkan routes di sini
// app.use('/api/v1/auth', authRoutes);

// --- Error Handling (harus di paling bawah, setelah semua routes) ---
app.use(notFoundHandler);
app.use(errorHandler);

// --- Start Server ---
app.listen(port, () => {
  logger.info(`🚀 Server is running at http://localhost:${port}`);
  logger.info(`📦 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});
