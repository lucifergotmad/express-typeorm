import { Request, Response } from "express";
import status from "http-status";

import { env } from "../config/env.const";

const errorHandler = (error: Error, req: Request, res: Response) => {
  const statusCode = res.statusCode ?? status.INTERNAL_SERVER_ERROR;

  res.status(statusCode);
  res.json({
    message: error.message,
    stack: env.MODE_API === "production" ? null : error.stack,
  });
};

export { errorHandler };
