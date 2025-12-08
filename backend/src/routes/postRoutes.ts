import { Router } from "express";
import { getPosts, createPost, getPostById, updatePost, deletePost } from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getPosts);
router.post("/", authenticate, createPost);
router.get("/:id", getPostById);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;
