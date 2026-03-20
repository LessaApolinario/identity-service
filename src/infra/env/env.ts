import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(3000),
});

export type Env = z.infer<typeof envSchema>;
