import { AppError } from "../utils/errorHandler.js";

const MAX_PLAINTEXT_CHARS = 4000;
const GCM_TAG_SIZE = 16;
const IV_SIZE = 12;
const SALT_SIZE = 16;

export const handlePayloadSize = (req, res, next) => {
    const { cipherText } = req.body;
    let decoded;
    try {
        decoded = Buffer.from(cipherText, 'base64').length;
    } catch (error) {
        throw new AppError("Invalid cipherText")
    }

    const plainTextSize = decoded - IV_SIZE - SALT_SIZE - GCM_TAG_SIZE;

    if(plainTextSize > MAX_PLAINTEXT_CHARS){
        throw new AppError("Paste cannot exceed 4000 characters");
    }

    next();
}