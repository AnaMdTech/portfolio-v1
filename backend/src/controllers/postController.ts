import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { postSchema } from "../utils/validation";

const prisma = new PrismaClient();

// Get All Posts (Newest First)
// src/controllers/postController.ts (replace getPosts)
export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          authorName: true,
          authorImage: true,
          content: true,
          tags: true,
          createdAt: true,
        },
      }),
      prisma.post.count(),
    ]);

    res.json({ data: posts, meta: { total, page, limit } });
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Create Post (Admin Only)
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validData = postSchema.parse(req.body);
    const newPost = await prisma.post.create({
      data: {
        title: validData.title,
        content: validData.content,
        imageUrl: validData.imageUrl,
        authorName: validData.authorName || "AnaMdTech",
        authorImage: validData.authorImage || "https://github.com/shadcn.png",
        tags: validData.tags || [],
      },
    });
    res.status(201).json(newPost);
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    res.status(500).json({ error: "Server error" });
  }
};

// GET Single Post
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) { res.status(500).json({ error: "Server Error" }); }
};

// DELETE Post
export const deletePost = async (req: Request, res: Response) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    res.json({ message: "Post deleted" });
  } catch (err) { res.status(500).json({ error: "Delete failed" }); }
};

// UPDATE Post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.post.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: "Update failed" }); }
};