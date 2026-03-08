import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '../..', '.env')})

const env = process.env;
export const PORT = env.PORT || 8000;
export const REDIS_HOST = env.REDIS_HOST || 'localhost';
export const REDIS_PORT = env.REDIS_PORT || 6379;
export const REDIS_PASSWORD = env.REDIS_PASSWORD || "";
export const REDIS_DB = env.REDIS_DB || "1";