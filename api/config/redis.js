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
        let value = null;
        if(await doesExist(`${key}:burn`)){
            value = await redis.getdel(key);
            redis.del(`${key}:burn`);
        }else{
            value = await redis.get(key);
        }
        return value;
    } catch (error) {
        console.error('Failed to get value', key);
        return null;   
    }
}

export const setValue = async (key, value, expiry = 3600, burnOnRead = false) => {
    try {
        let set;
        if(burnOnRead){
            set = await redis.setex(key, expiry, value);
            const setBurn = await redis.setex(`${key}:burn`,expiry,1);
            return set == "OK" && setBurn == "OK";
        }else{
            set = await redis.setex(key, expiry, value);
            return set == "OK"
        }
    } catch (error) {
        console.error('Failed to set value', error);
        return false;   
    }
}

export const doesExist = async (key) => {
    try {
        return await redis.exists(`${key}`);    
    } catch (error) {
        console.error('Failed to check if exists', error);
        return  false;
    }
}