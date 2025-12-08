import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import api from "../api/axios";
import { usePageTitle } from "../hooks/usePageTitle";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  role: string;
  year: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Determine Back Path
  const backPath = location.state?.from === "/work" ? "/work" : "/";
  const backLabel =
    location.state?.from === "/work" ? "Back to Archive" : "Back to Base";

  useEffect(() => {
    setLoading(true);
    api
      .get("/projects")
      .then((res) => {
        const found = res.data.data.find((p: Project) => p.id === id);
        setProject(found);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  usePageTitle(project?.title || "Project Details"); // Set the page title to the project title

  // 2. Show Loading Screen
  if (loading)
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <Loading />
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Artifact Not Found
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Artifact...
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
      <Navbar />

      {/* HEADER SECTION (Typography based) */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        {/* 3. Dynamic Back Button */}
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> {backLabel}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          {project.title}
        </motion.h1>

        {/* INFO GRID (Like the reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-8 mt-8">
          <div>
            <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-2">
              Role
            </h3>
            <p className="text-xl font-medium">{project.role}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-2">
              Year
            </h3>
            <p className="text-xl font-medium">{project.year}</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((t) => (
                <span key={t} className="px-2 py-1 bg-white/10 rounded text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 my-12 h-[60vh] md:h-[80vh] overflow-hidden"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full rounded-xl shadow-2xl border border-white/10"
        />
      </motion.div>

      {/* DESCRIPTION & ACTIONS */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-invert prose-lg max-w-none">
          {/* CUSTOM MARKDOWN RENDERER */}
          <ReactMarkdown
            components={{
              // Override default HTML tags with your Futuristic Styles
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl font-bold text-white mt-12 mb-6"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold text-primary mt-12 mb-4 border-l-4 border-primary pl-4"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-gray-300 leading-relaxed mb-6 text-lg"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <div className="my-12 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <img className="w-full object-cover" {...props} />
                </div>
              ),
            }}
          >
            {project.description}
          </ReactMarkdown>
        </div>

        <div className="flex gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              className="px-8 py-4 bg-primary text-black font-bold rounded hover:bg-cyan-400 transition-colors flex items-center gap-2"
            >
              <ExternalLink size={20} /> VIEW LIVE PROJECT
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              className="px-8 py-4 border border-white/20 rounded hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Github size={20} /> SOURCE CODE
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
