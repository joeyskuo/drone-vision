import * as Sentry from '@sentry/react';
import { isDev } from '@/config/env';

type LogContext = Record<string, unknown>;
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const SENTRY_LEVELS: Record<LogLevel, Sentry.SeverityLevel> = {
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

function emit(level: LogLevel, message: string, context?: LogContext): void {
  if (isDev) {
    const consoleMethod = level === 'debug' ? 'log' : level;
    const payload = context ? [message, context] : [message];
    // eslint-disable-next-line no-console
    console[consoleMethod](...payload);
  }
  Sentry.addBreadcrumb({
    level: SENTRY_LEVELS[level],
    message,
    ...(context ? { data: context } : {}),
    timestamp: Date.now() / 1000,
  });
}

export const logger = {
  debug: (message: string, context?: LogContext) => emit('debug', message, context),
  info: (message: string, context?: LogContext) => emit('info', message, context),
  warn: (message: string, context?: LogContext) => emit('warn', message, context),
  error: (message: string, error?: unknown, context?: LogContext) => {
    emit('error', message, context);
    if (error !== undefined) {
      Sentry.captureException(error, context ? { extra: context } : undefined);
    }
  },
} as const;
