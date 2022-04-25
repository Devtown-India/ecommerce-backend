import jwt from "jsonwebtoken";

export const signJWT = (payload={},expiry='24h')=>{
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: expiry,
        });
        return token;
    } catch (error) {
         return null
    }
}
