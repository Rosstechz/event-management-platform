import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel";

dotenv.config();

// Get admin credentials from .env file
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

// Controller for admin login
export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if email matches the stored admin email
    if (email !== ADMIN_EMAIL) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Compare plain text password (NO hashing)
    if (password !== ADMIN_PASSWORD) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: "admin", email },
      ADMIN_JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
    return;
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
    return;
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password do not match" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Invalid registration details" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully " });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.USER_JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { email: user.email, role: "user" },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
