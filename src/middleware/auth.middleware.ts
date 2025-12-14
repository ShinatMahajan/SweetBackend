import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/auth/user.model";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // attach full user from DB (so we have role and other info)
    const user = await User.findById(decoded.userId).select("username email role");
    if (!user) return res.status(401).json({ message: "Invalid token (user not found)" });

    req.user = { id: user._id, username: user.username, email: user.email, role: (user as any).role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};
