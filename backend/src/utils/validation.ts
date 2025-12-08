import { z } from "zod";

// Define what a "Login Request" must look like
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" }) // Checks for @, ., and no spaces
    .min(5, "Email too short"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define what a "Project" must look like
export const projectSchema = z.object({
  title: z.string().min(3, "Title required"),
  description: z.string().min(10, "Description too short"),
  imageUrl: z.string().url("Must be a valid URL"),
  techStack: z.array(z.string()).min(1, "Add at least one tech"),
  role: z.string().optional(),
  year: z.string().optional(),
  client: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string().min(5, "Title too short"),
  content: z.string().min(20, "Content too short"),
  imageUrl: z.string().url("Invalid Cover Image"),
  authorName: z.string().optional(),
  authorImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
});