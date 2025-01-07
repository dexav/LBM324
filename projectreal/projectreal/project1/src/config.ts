import { config } from 'dotenv';
import { envSchema } from './types/config.js';

config();

export const env = envSchema.parse(process.env);