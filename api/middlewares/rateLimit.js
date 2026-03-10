import { isRateLimitExceed } from "../config/redis.js";
import { AppError } from "../utils/errorHandler.js";
import { getUserIp } from "../utils/getUserIp.js";

const GLOBAL_LIMIT_PER_MINUTE_PER_IP = 100;
const GLOBAL_LIMIT_PER_HOUR_PER_IP = 1000;
const CREATE_PASTE_LIMIT_PER_HOUR_PER_IP = 15;


export const globalRateLimitMiddleware = async (req, res, next) => {
    const ip = getUserIp(req);
    const isMinuteLimitExceed = await isRateLimitExceed(`ratelimit:${ip}:global:minutes`, 60, GLOBAL_LIMIT_PER_MINUTE_PER_IP);
    if(isMinuteLimitExceed){
        throw new AppError("Rate limit exceed, please try again later", 429);
    }
    const isHourLimitExceed = await isRateLimitExceed(`ratelimit:${ip}:global:hour`, 3600, GLOBAL_LIMIT_PER_HOUR_PER_IP);
    if(isHourLimitExceed){
        throw new AppError("Rate limit exceed, please try again later", 429);
    }
    next();
}

export const createPasteRateLimitMiddleware = async (req, res, next) => {
    const ip = getUserIp(req);
    const isHourLimitExceed = await isRateLimitExceed(`ratelimit:${ip}:create`, 3600, CREATE_PASTE_LIMIT_PER_HOUR_PER_IP);
    if(isHourLimitExceed){
        throw new AppError("Rate limit exceed, please try again later", 429);
    }
    next();
}