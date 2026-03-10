import crypto from "crypto"
export const generateRandomString = (len = 16) => {
    return crypto.randomBytes(len).toString('base64Url');
}