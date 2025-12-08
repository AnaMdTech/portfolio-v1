import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    console.log("Attempting to send email to:", process.env.MY_EMAIL);

    // 1. Send Email Notification
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.MY_EMAIL as string,
      subject: `🚀 New Portfolio Contact: ${name}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #00f3ff;">
          ${message}
        </blockquote>
      `,
    });

    // 2. CHECK FOR RESEND SPECIFIC ERRORS
    if (error) {
      console.error("Resend API Error:", error);
      res.status(400).json({ error: error.message });
      return;
    }

    console.log("Email sent successfully:", data);

    // 3. Save to Database (Only if email succeeds)
    await prisma.message.create({
      data: { sender: name, email, content: message },
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
