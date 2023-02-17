import { z } from "zod";

export const BodySchema = (schema: z.AnyZodObject) => {
  return z.object({
    body: schema,
  });
};

export const QuerySchema = (schema: z.AnyZodObject) => {
  return z.object({
    query: schema,
  });
};

export const ParamsSchema = (schema: z.AnyZodObject) => {
  return z.object({
    params: schema,
  });
};
