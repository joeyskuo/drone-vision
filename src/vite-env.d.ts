/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BFF_ENDPOINT: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
