import rateLimit from 'express-rate-limit';
import { env } from '../config.js';

export const rateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: { error: 'Too many requests, please try again later' }
});