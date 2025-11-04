import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  userId: string;
}
interface AuthenticatedRequest extends Request {
    user?: any;
}
export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
   
    try {
      let token = req.cookies?.jwt;
  
      if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
  
      if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as DecodedToken;
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error("Auth error:", error);
      res.status(401).json({ message: "Not authorized" });
    }
  };
  