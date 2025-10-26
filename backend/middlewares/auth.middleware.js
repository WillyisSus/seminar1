import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("Token: ", token)
    try {
        if (!token){
            res.status(401).json({msg: "Missing token"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded){
            res.status(401).json({msg: "Invalid token"})
        }
        const user = await User.findOne({where: {user_id: decoded.userId}})
        if (!user){
            res.status(401).json({msg: "Invalid User - Please login for new token"})
        }
        req.user = user.username
        next();
    } catch (error) {
        console.log("Auth Middleware: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}
