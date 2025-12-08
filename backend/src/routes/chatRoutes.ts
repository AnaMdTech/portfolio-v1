import { Router } from "express";
import { chatWithAI } from "../controllers/chatController";

const router = Router();
router.post("/", chatWithAI); // Public route (no auth needed)
export default router;
