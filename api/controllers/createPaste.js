import { setValue } from "../config/redis.js";
import { AppError } from "../utils/errorHandler.js";
import { generateRandomString } from "../utils/randomString.js";

export const createPaste = async (req, res) => {
    const { cipherText, expiry, burnOnRead } = req.body;
    const id = generateRandomString();
    const set = await setValue(id, cipherText, expiry, burnOnRead);
    if(!set){
        throw new AppError("Failed to create paste! please try again");
    }
    res.send({ status: true, message: "Paste created successfully" , id })
}