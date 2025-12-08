import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (
  res: Response,
  userId: string
): string => {
  // Create JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  // Set as HTTP-only secure cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only on HTTPS
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // also return token so you can send in response
};
