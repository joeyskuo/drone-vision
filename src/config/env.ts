import { z } from 'zod';

const envSchema = z.object({
  VITE_BFF_ENDPOINT: z.string().url(),
  VITE_SENTRY_DSN: z.string().url().optional(),
  MODE: z.enum(['development', 'production', 'test']),
  DEV: z.boolean(),
  PROD: z.boolean(),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  return result.data;
}

export const env = parseEnv();

export const isDev = env.DEV;
export const isProd = env.PROD;
export const isTest = env.MODE === 'test';
