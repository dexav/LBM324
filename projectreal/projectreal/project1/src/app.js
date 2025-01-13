import express from 'express';
import { query } from './db.js'; // Falls dein Service eine Datenbankverbindung hat

const app = express();

// Health-Check Endpoint
app.get('/health', async (req, res) => {
    try {
        // Optional: Datenbankstatus prüfen
        const dbStatus = await query('SELECT NOW()');
        if (!dbStatus) {
            return res.status(500).json({ status: 'fail', message: 'Database is not reachable' });
        }

        res.status(200).json({ 
            status: 'pass',
            message: 'Service is healthy',
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'fail', 
            message: 'Service is unhealthy',
            error: error.message 
        });
    }
});

// Exportiere die App oder starte sie direkt
export default app;
