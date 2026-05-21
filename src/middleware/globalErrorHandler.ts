import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || null,
  });
};

export default globalErrorHandler;
