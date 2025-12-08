import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { usePageTitle } from "../hooks/usePageTitle";
import Loading from "../components/Loading";

interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  imageUrl: string;
}

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/projects")
      .then((res) => setProjects(res.data.data || []))
      .catch((err) => console.error("Failed to fetch projects"))
      .finally(() => setLoading(false));
  }, []);

  usePageTitle("All Projects"); // Set the page title to "All Projects"

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft size={20} /> Back Home
          </Link>
          <h1 className="text-5xl font-bold">The Archive</h1>
          <p className="text-gray-400 mt-2">
            A complete collection of digital artifacts.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/project/${p.id}`}
                  state={{ from: "/work" }}
                  className="block overflow-hidden rounded-xl border border-white/10 relative"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-surface">
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <p className="text-sm text-gray-400">
                      {p.role} · {p.year}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
