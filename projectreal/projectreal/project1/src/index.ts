import express from 'express';
import { ServerManager } from './services/server-manager.js';
import { logger } from './utils/logger.js';
import { ServerConfigSchema, PlayerCountSchema } from './types/config.js';
import { errorHandler } from './middleware/error-handler.js';
import { rateLimiter } from './middleware/rate-limit.js';
import { env } from './config.js';

const app = express();
const serverManager = new ServerManager();

app.use(express.json());
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Create a new game server
app.post('/servers', async (req, res, next) => {
  try {
    const config = ServerConfigSchema.parse(req.body);
    const server = await serverManager.createServer(config);
    res.status(201).json(server);
  } catch (error) {
    next(error);
  }
});

// Stop a game server
app.delete('/servers/:id', async (req, res, next) => {
  try {
    await serverManager.stopServer(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get server status
app.get('/servers/:id', (req, res) => {
  const server = serverManager.getServer(req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }
  res.json(server);
});

// List all servers
app.get('/servers', (req, res) => {
  const servers = serverManager.getAllServers();
  res.json(servers);
});

// Update player count
app.patch('/servers/:id/players', (req, res, next) => {
  try {
    const { playerCount } = PlayerCountSchema.parse(req.body);
    serverManager.updatePlayerCount(req.params.id, playerCount);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

// Error handling middleware should be last
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});