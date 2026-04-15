import * as Sentry from '@sentry/react';
import { env, isProd } from '@/config/env';

if (env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: env.VITE_SENTRY_DSN,
    environment: env.MODE,
    release: __APP_VERSION__,
    sendDefaultPii: false,
    tracesSampleRate: isProd ? 0.1 : 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: isProd ? 0.1 : 0,
    integrations: [Sentry.browserTracingIntegration()],
    beforeSend(event, hint) {
      const error = hint.originalException;
      if (error instanceof Error && error.name === 'CancelledError') return null;
      return event;
    },
  });
}
