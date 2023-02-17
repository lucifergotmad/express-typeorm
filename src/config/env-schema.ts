import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  MODE_API: z.enum(["development", "test", "production"]),
  PORT: z.number(),
  JWT_SECRET_KEY: z.string(),
  JWT_LIMIT: z.number(),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASS: z.string(),
  DATABASE_NAME: z.string(),
});

const env = envSchema.safeParse({
  ...process.env,
  PORT: +String(process.env.PORT),
  JWT_LIMIT: +String(process.env.JWT_LIMIT),
});

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}

const { data } = env;

export { data as env };
