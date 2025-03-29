import envConfig from '@/config/env.config';
import pino from 'pino';

const logger = pino({
  level: envConfig.NEXT_PUBLIC_DEVELOPMENT === 'production' ? 'info' : 'debug',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }), // Format level to uppercase
  },
  transport:
    envConfig.NEXT_PUBLIC_DEVELOPMENT !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss Z', // ✅ Fix timestamp format
            ignore: 'pid,hostname', // ✅ Hide process ID & hostname
          },
        }
      : undefined, // In production, logs remain structured JSON
});

export default logger;
