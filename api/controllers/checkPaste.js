import { doesExist } from "../config/redis.js"

export const checkPaste = (filePath) =>  async (req, res, next) => {
    const { id } = req.params;
    if(await doesExist(id)){
      res.sendFile(filePath);
      return;
    }
    next();
}