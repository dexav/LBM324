import express from 'express';
import serverRoutes from './routes/server-routes.js';
import { config } from './config.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(serverRoutes);

export default app;