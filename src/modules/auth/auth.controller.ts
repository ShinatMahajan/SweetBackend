import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, role: (user as any).role || "user" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: (user as any).role },
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
};
