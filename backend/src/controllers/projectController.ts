import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get All Projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          role: true,
          year: true,
          client: true,
          description: true,
          liveLink: true,
          githubLink: true,
          techStack: true,
          isFeatured: true,
        },
      }),
      prisma.project.count(),
    ]);

    res.json({ data: projects, meta: { total, page, limit } });
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

// Create Project (Protected)
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, liveLink, githubLink, techStack, role, year, client, isFeatured } =
      req.body;

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        liveLink,
        githubLink,
        techStack,
        role: role || "Developer",
        year: year || new Date().getFullYear().toString(),
        client: client || "Self",
        isFeatured: req.body.isFeatured || false,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
};

// GET Single Project
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: req.params.id } });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) { res.status(500).json({ error: "Server Error" }); }
};

// DELETE Project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ message: "Project deleted" });
  } catch (err) { res.status(500).json({ error: "Delete failed" }); }
};

// UPDATE Project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body, // In a real app, validate this data again with Zod
    });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: "Update failed" }); }
};