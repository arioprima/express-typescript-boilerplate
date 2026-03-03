import pinoHttp from 'pino-http';
import logger from '@/config/logger';

export const requestLogger = pinoHttp({
  logger,

  // Tentukan level berdasarkan status code
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error'; // 500+ → merah
    if (res.statusCode >= 400) return 'warn'; // 400-499 → kuning
    return 'info'; // 200-399 → hijau
  },

  // Custom message saat request selesai
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },

  // Custom message saat request error
  customErrorMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },

  // Jangan log health check / favicon supaya tidak berisik
  autoLogging: {
    ignore: (req) => {
      const url = req.url || '';
      return url === '/favicon.ico' || url === '/health';
    },
  },

  // Sederhanakan object yang di-log
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
