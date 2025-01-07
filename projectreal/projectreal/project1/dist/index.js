import express from 'express';
import { ServerManager } from './services/server-manager.js';
import { logger } from './utils/logger.js';
import { validatePort } from './utils/helpers.js';
import { config } from 'dotenv';
config();
const app = express();
const serverManager = new ServerManager();
app.use(express.json());
// Create a new game server
app.post('/servers', async (req, res) => {
    try {
        const { type, maxPlayers, port } = req.body;
        if (!validatePort(port)) {
            return res.status(400).json({ error: 'Invalid port number' });
        }
        const config = {
            type: type,
            maxPlayers,
            port
        };
        const server = await serverManager.createServer(config);
        res.status(201).json(server);
    }
    catch (error) {
        logger.error('Error creating server:', error);
        res.status(500).json({ error: 'Failed to create server' });
    }
});
// Stop a game server
app.delete('/servers/:id', async (req, res) => {
    try {
        await serverManager.stopServer(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        logger.error('Error stopping server:', error);
        res.status(500).json({ error: 'Failed to stop server' });
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
app.patch('/servers/:id/players', (req, res) => {
    try {
        const { playerCount } = req.body;
        serverManager.updatePlayerCount(req.params.id, playerCount);
        res.status(200).send();
    }
    catch (error) {
        logger.error('Error updating player count:', error);
        res.status(500).json({ error: 'Failed to update player count' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
