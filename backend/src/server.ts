// Import Libraries
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Import Routes
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import chatRoutes from "./routes/chatRoutes";
import contactRoutes from "./routes/contactRoutes";
import postRoutes from "./routes/postRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-v1-2-nv0rep1i2-anamdtechs-projects.vercel.app",
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json()); // Parse JSON bodies
app.use(helmet());       // Secure HTTP headers
app.use(cookieParser()); // Parse cookies

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes); 
app.use("/api/posts", postRoutes);

// Basic Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Portfolio API is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}\n`);
});