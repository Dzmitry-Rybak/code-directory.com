import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv'; // ENVIRONMENT VARIABLES
dotenv.config();

const POSTGRESQL_HOST = process.env.POSTGRESQL_HOST || 'postgres';
const POSTGRESQL_USER = process.env.POSTGRESQL_USER || 'postgres';
const POSTGRESQL_PORT = process.env.POSTGRESQL_PORT || 5432;
const POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD || '23400';
const POSTGRESQL_DB = process.env.POSTGRESQL_DB || 'codedirectory';

const pool = new Pool({
    user: POSTGRESQL_USER,
    host: POSTGRESQL_HOST,
    database: POSTGRESQL_DB,
    password: POSTGRESQL_PASSWORD,
    port: POSTGRESQL_PORT,
});

export default pool;