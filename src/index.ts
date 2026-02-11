import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

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
