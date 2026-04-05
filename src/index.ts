import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './config/logger';
import prisma from './config/database';
import { requestLogger } from './middlewares/requestLogger';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import { trimHandler } from './middlewares/trimHandler';
import { langMiddleware } from './middlewares/langMiddleware';

const app = express();
const port = process.env['PORT'] || 3000;

// --- Security Headers (helmet) ---
app.use(helmet());

// --- CORS ---
app.use(
  cors({
    origin: process.env['CORS_ORIGIN'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// --- Body Parsers ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(trimHandler);
app.use(langMiddleware);

// --- Request Logger (log setiap HTTP request) ---
app.use(requestLogger);

// --- Health Check (untuk load balancer / docker) ---
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Routes ---
app.get('/', (_, res) => {
  res.json({ success: true, message: 'ShiftKu API is running 🚀' });
});

// TODO: Tambahkan routes di sini
// app.use('/api/v1/auth', authRoutes);

// --- Error Handling (harus di paling bawah, setelah semua routes) ---
app.use(notFoundHandler);
app.use(errorHandler);

// --- Start Server ---
const server = app.listen(port, () => {
  logger.info(`🚀 Server is running at http://localhost:${port}`);
  logger.info(`📦 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});

// --- Graceful Shutdown ---
const shutdown = async (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info('HTTP server closed');
  });
  await prisma.$disconnect();
  logger.info('Database connection closed');
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
