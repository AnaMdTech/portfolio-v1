import { Router } from "express";
import { getAllProjects, createProject, getProjectById, updateProject, deleteProject } from "../controllers/projectController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllProjects);
router.post("/", authenticate, createProject);
router.get("/:id", getProjectById);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;