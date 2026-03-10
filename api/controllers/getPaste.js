import { getValue } from "../config/redis.js"
import { AppError } from "../utils/errorHandler.js";

export const getPaste = async (req, res) => {
    const { id } = req.params;
    if(!id?.trim()){
        throw new AppError("Invalid paste id")
    }

    const paste = await getValue(id);

    if(!paste){
        throw new AppError("Paste not found", 404)
    }
    
    res.json({
        status: true,
        message: "Paste fetched successfully",
        cipherText: paste
    })
}