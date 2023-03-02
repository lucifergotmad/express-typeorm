import { NextFunction, Request, Response } from "express";
import status from "http-status";

import { env } from "../config/env-schema";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ?? status.INTERNAL_SERVER_ERROR;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: env.MODE_API === "production" ? null : err.stack,
  });
};

export { errorHandler };
