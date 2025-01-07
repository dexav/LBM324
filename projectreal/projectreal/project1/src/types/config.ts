import { z } from 'zod';
import { GameType } from './index.js';

export const ServerConfigSchema = z.object({
  type: z.nativeEnum(GameType),
  maxPlayers: z.number().int().min(1).max(100),
  port: z.number().int().min(1024).max(65535)
});

export const PlayerCountSchema = z.object({
  playerCount: z.number().int().min(0)
});

export const envSchema = z.object({
  PORT: z.string().transform(Number).pipe(z.number().int().min(1024).max(65535)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100')
});