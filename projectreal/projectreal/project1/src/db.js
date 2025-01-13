import pkg from 'pg';
const { Pool } = pkg;

import { config } from '../config.js';

const pool = new Pool({
    connectionString: config.database.connectionString
});

export const query = (text, params) => {
    return pool.query(text, params);
};
