import { AppError } from "../utils/errorHandler.js";

const ALLOWED_EXPIRY_VALUES = [600, 1800, 3600, 21600];

export const validateInput = (req, _res, next) => {
    if(!req.body){
        throw new AppError("Invalid Payload")
    }
    const { cipherText, expiry, burnOnRead } = req.body;
    let err = false;
    
    if(!cipherText?.trim() || typeof burnOnRead !== "boolean"){
        err = true;
    }

    if(typeof expiry !== "number" || !Number.isInteger(expiry)){
        err = true;
    }

    if(!ALLOWED_EXPIRY_VALUES.includes(expiry)){
        throw new AppError(`expiry must be one of ${ALLOWED_EXPIRY_VALUES}`)
    }

    if(err){
        throw new AppError("Payload missing / invalid type");
    }

    try{
        atob(cipherText)
    } catch (err){
        throw new AppError("Invalid cipherText")
    }

    next();
}