import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_DB, REDIS_URL } from './env.js'

let redis = "";

if(REDIS_URL){
    redis = new Redis(REDIS_URL)
}else{
    redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    db: REDIS_DB
});
}

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
        console.error('Failed to check if key exists', error);
        return  false;
    }
}

export const isRateLimitExceed = async (key, expiry, limit) => {
    try {
        const inc = await redis.incr(key);
        if(inc === 1){
            await redis.expire(key,expiry)
        }
        return inc > limit;        
    } catch (error) {
        console.error('Error in isRateLimitExceed function',error);
        return false;
    }
}