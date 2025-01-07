import express from 'express';
import { dockerService } from '../services/docker-service.js';
import { serverManager } from '../services/server-manager.js';

const router = express.Router();

router.post('/createServer', async (req, res) => {
    try {
        const { spielTyp, port } = req.body;

        if (!spielTyp || !port) {
            return res.status(400).json({
                nachricht: 'Bitte Spieltyp und Port angeben!'
            });
        }

        const containerId = await dockerService.createContainer(spielTyp, port);
        const server = serverManager.addServer(spielTyp, port, containerId);

        res.json({
            nachricht: 'Server wurde erstellt!',
            server
        });
    } catch (error) {
        console.error('Fehler:', error);
        res.status(500).json({
            nachricht: 'Fehler beim Erstellen des Servers: ' + error.message
        });
    }
});

router.post('/stopServer', async (req, res) => {
    try {
        const { id } = req.body;
        const server = serverManager.getServer(id);

        if (!server) {
            return res.status(404).json({
                nachricht: 'Server nicht gefunden!'
            });
        }

        await dockerService.stopContainer(server.containerId);
        serverManager.removeServer(id);

        res.json({
            nachricht: 'Server wurde gestoppt!'
        });
    } catch (error) {
        console.error('Fehler:', error);
        res.status(500).json({
            nachricht: 'Server konnte nicht gestoppt werden.'
        });
    }
});

router.get('/alleServer', (req, res) => {
    res.json(serverManager.getAllServers());
});

export default router;