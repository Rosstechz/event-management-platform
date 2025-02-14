import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";

dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET as string;

export const verifyAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ADMIN_SECRET) as {
      id: string;
      role: string;
    };

    if (decoded.role !== "admin") {
      res
        .status(403)
        .json({ message: "Forbidden: Only admin can create events" });
      return;
    }
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export const verifyUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.USER_JWT_SECRET as string
    ) as { id: string; role: string };

    if (decoded.role !== "user") {
      res
        .status(403)
        .json({ message: "Forbidden: unauthorized authorized user" });
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.log("JWT Verification Error", error);

    res.status(400).json({ message: "Invalid token" });
  }
};
