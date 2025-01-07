import app from './src/app.js';
import { config } from './src/config.js';

app.listen(config.port, () => {
    console.log('=== Game Server Manager ===');
    console.log(`Server läuft auf Port ${config.port}`);
    console.log(`Öffne http://localhost:${config.port} im Browser`);
});