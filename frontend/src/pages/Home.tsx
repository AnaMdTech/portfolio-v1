import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  role: string;
  year: string;
  client: string;
}

const Home = () => {
  usePageTitle("Home"); // Set the page title to "Home"

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects for the public grid
    api
      .get("/projects")
      .then((res) => {
        const featured = res.data.data.filter((p: any) => p.isFeatured === true);
        setProjects(featured);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-primary text-xs font-bold tracking-widest mb-6">
              SYSTEM ONLINE // WELCOME USER
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
              BUILDING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                THE FUTURE
              </span>
            </h1>
            {/* <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
              I AM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ANAMDTECH
              </span>
            </h1> */}
            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
              I am a Full Stack Engineer specializing in scalable architecture,
              modern interfaces, and artificial intelligence solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                VIEW WORK <ArrowRight size={20} />
              </a>
              <a
                href="https://github.com/AnaMdTech"
                target="_blank"
                className="px-8 py-4 border border-white/20 rounded hover:bg-white/10 transition-colors"
              >
                GITHUB PROFILE
              </a>
            </div>
          </motion.div>

          {/* Abstract Tech Visual (Right Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {/* Decorative Cards */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-12">
              <Code className="text-primary mb-4" size={40} />
              <h3 className="font-bold text-xl mb-2">Frontend</h3>
              <p className="text-gray-400 text-sm">
                React, Tailwind, Framer Motion, TypeScript
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <Database className="text-secondary mb-4" size={40} />
              <h3 className="font-bold text-xl mb-2">Backend</h3>
              <p className="text-gray-400 text-sm">
                Node, Express, PostgreSQL, Prisma
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm col-span-2">
              <Globe className="text-green-400 mb-4" size={40} />
              <h3 className="font-bold text-xl mb-2">Deployment</h3>
              <p className="text-gray-400 text-sm">
                Docker, CI/CD, AWS, Vercel
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW ABOUT SECTION (Fixes the link) */}
      <section id="about" className="py-24 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            SYSTEM ARCHITECT
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            At <span className="text-primary font-bold">AnaMdTech</span>, I
            don't just write code; I engineer digital ecosystems. My mission is
            to bridge the gap between complex backend logic and immersive
            frontend experiences. I operate in the top 1% of software
            engineering standards, utilizing strict typing, automated testing,
            and scalable cloud infrastructure.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["TypeScript", "React", "Node.js", "PostgreSQL"].map((skill) => (
              <div
                key={skill}
                className="p-4 border border-white/10 rounded-lg hover:border-primary/50 hover:bg-white/5 transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">SELECTED WORKS</h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Inside Home.tsx -> Projects Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -10 }}
                className="group bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col"
              >
                {/* 1. Image */}
                <div className="h-64 overflow-hidden relative">
                  <Link to={`/project/${p.id}`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>

                {/* 2. Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-1">{p.title}</h3>

                  {/* The Subtitle: Role · Year */}
                  <p className="text-gray-500 text-sm font-medium mb-6">
                    {p.role || "Developer"} · {p.year || "2024"}
                  </p>

                  <div className="mt-auto">
                    {/* "See Case" Button */}
                    <Link
                      to={`/project/${p.id}`}
                      className="inline-block w-full text-center py-3 border border-white/10 rounded hover:bg-white/5 hover:border-primary/50 hover:text-primary transition-all font-bold tracking-widest text-sm"
                    >
                      SEE CASE
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* NEW BUTTON */}
          <div className="mt-16 text-center">
            <Link
              to="/work"
              className="inline-block px-8 py-3 border border-white/20 rounded-full hover:bg-white text-white hover:text-black transition-all font-bold tracking-widest"
            >
              VIEW FULL ARCHIVE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
