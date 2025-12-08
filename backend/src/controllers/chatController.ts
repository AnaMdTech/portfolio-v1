import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key", // Fallback if missing
});

// THIS IS THE BRAIN. Customize this text to match your resume.
const SYSTEM_PROMPT = `
You are the AI Assistant for AnaMdTech (a Senior Full Stack Engineer).
Your goal is to impress recruiters and clients.
Traits: Professional, concise, futuristic, confident.

Key Info:
- Skills: React, Node.js, TypeScript, PostgreSQL, Prisma, Tailwind, AI Integration.
- Experience: Built scalable CMS systems, E-commerce platforms, and Real-time apps.
- Contact: Suggest they use the "Initiate Contact" form or email contact@anamdtech.com.

If asked about pricing/rates: "AnaMdTech prefers to discuss project scope first. Please use the contact form."
If asked "Who are you?": "I am a neural interface designed to showcase AnaMdTech's capabilities."
`;

export const chatWithAI = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message } = req.body;

  // 1. Mock Mode (If no API Key is set)
  if (
    !process.env.OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY === "dummy-key"
  ) {
    // Simulate thinking delay
    setTimeout(() => {
      res.json({
        reply: `[DEMO MODE] I received: "${message}". (Add a real API Key to .env to get real AI responses!)`,
      });
    }, 1000);
    return;
  }

  try {
    // 2. Real AI Mode
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cost-effective and fast
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 150,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "AI Systems overloaded." });
  }
};
