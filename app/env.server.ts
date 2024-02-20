import {
  getEnvValue,
  getOptionalBoolValue,
  getOptionalEnvValue,
} from './utils/env';
import { z } from 'zod';
export const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).optional(),
  ZENDESK_TOKEN: z.string().optional(),
  SESSION_SECRET: z.string().optional(),
  ENCRYPTION_PASSPHRASE: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  MAP_FLOW_PRICE_ID: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SIGNING_SECRET: z.string().optional(),
  FATHOM_SITE_ID: z.string().optional(),
  BROWSERLESS_URL: z.string().optional(),
  IS_STUDENT: z.enum(['true', 'false']).optional(),
  BOX_SIG_KEY: z.string().optional(),
});

type ENV_VARS = z.infer<typeof envSchema>;
export function init() {
  const parsed = envSchema.safeParse(process.env);

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    );

    throw new Error('Invalid envirmonment variables');
  }
}

export const ZENDESK_TOKEN = getEnvValue('ZENDESK_TOKEN');
export const SESSION_SECRET = getEnvValue('SESSION_SECRET');
export const ENCRYPTION_PASSPHRASE = getEnvValue('ENCRYPTION_PASSPHRASE');
export const SENDGRID_API_KEY = getEnvValue('SENDGRID_API_KEY');

//STRIPE KEYS ARE ONLY REQUIRED IN PRODUCTION, STAGING and STUDENT ENVIRONMENT
export const SENTRY_DSN = getOptionalEnvValue('SENTRY_DSN', '');

//STRIPE KEYS ARE ONLY REQUIRED IN PRODUCTION and STAGING ENVIRONMENT
export const MAP_FLOW_PRICE_ID = getOptionalEnvValue('MAP_FLOW_PRICE_ID', '');
export const STRIPE_SECRET_KEY = getOptionalEnvValue('STRIPE_SECRET_KEY', '');
export const STRIPE_WEBHOOK_SIGNING_SECRET = getOptionalEnvValue(
  'STRIPE_WEBHOOK_SIGNING_SECRET',
  ''
);

//FATHOM only required in production and student
export const FATHOM_SITE_ID = getOptionalEnvValue('FATHOM_SITE_ID', '');
export const BROWSERLESS_URL = getOptionalEnvValue(
  'BROWSERLESS_URL',
  'browserless:3000'
);
export const IS_STUDENT = getOptionalBoolValue('IS_STUDENT', false);

export const BOX_SIG_KEY = getOptionalEnvValue('BOX_SIG_KEY', '');

/**
 * This is used in `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export const getEnv = () => ({
  FATHOM_SITE_ID,
  IS_STUDENT,
  MODE: process.env.NODE_ENV,
});

export type ENV = ReturnType<typeof getEnv>;

declare global {
  interface Window {
    ENV: ENV;
  }
  namespace NodeJS {
    interface ProcessEnv extends ENV_VARS {}
  }
}
