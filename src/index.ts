import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import { validate } from './middlewares/validate';

const app = express();
const port = process.env['PORT'] || 3000;

// --- Body Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`📦 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});
