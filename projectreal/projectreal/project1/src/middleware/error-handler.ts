import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path
  });

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors
    });
  }

  res.status(500).json({
    error: 'Internal server error'
  });
}