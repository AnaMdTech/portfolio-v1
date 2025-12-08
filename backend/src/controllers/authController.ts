import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies";
import { hashPassword,comparePasswords } from "../utils/passwordUtils";
import { loginSchema } from "../utils/validation";

const prisma = new PrismaClient();

// 1. Register User (Use this ONCE via Postman to create your account, then disable/ignore)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, profileImage } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save to DB
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: username,
        profileImage: profileImage || "",
      },
    });

    res.status(201).json({ message: "Admin created", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 2. Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // Compare Password
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT Token
    const token = generateTokenAndSetCookies(res, user.id);

    // Return token as well so frontend can store it (app expects `res.data.token`)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
};
