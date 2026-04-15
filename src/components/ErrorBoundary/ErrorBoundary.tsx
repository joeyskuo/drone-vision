import * as Sentry from '@sentry/react';
import type { PropsWithChildren, ReactNode } from 'react';

interface FallbackProps {
  error: unknown;
  resetError: () => void;
}

function DefaultFallback({ error, resetError }: FallbackProps): ReactNode {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  return (
    <div
      role="alert"
      className="surface-card flex flex-col items-center justify-center gap-3 border border-border rounded-[20px] p-12 text-center"
    >
      <h2 className="text-xl font-bold text-accent">Something went wrong</h2>
      <p className="text-text-muted">{message}</p>
      <button
        type="button"
        onClick={resetError}
        className="bg-accent rounded-lg text-white font-sans text-sm font-bold py-2 px-4 cursor-pointer hover:bg-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}

export function ErrorBoundary({ children }: PropsWithChildren): ReactNode {
  return (
    <Sentry.ErrorBoundary
      fallback={(props) => (
        <DefaultFallback
          error={props.error}
          resetError={() => {
            props.resetError();
          }}
        />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
