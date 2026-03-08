import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_DB } from './env.js'

const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    db: REDIS_DB
});

redis.on("error", (err) => {
    console.error('Error in Redis',err);
})

export const getValue = async (key) => {
    try {
        const value = await redis.get(key);
        return value;
    } catch (error) {
        console.error('Failed to get value', key);
        return null;   
    }
}

export const setValue = async (key, value) => {
    try {
        const set = await redis.set(key, value);
        return set;
    } catch (error) {
        console.error('Failed to set value', key);
        return false;   
    }
}