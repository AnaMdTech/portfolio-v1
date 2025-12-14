import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  imageUrl: string;
}

const SelectedWork = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="work" className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">SELECTED WORKS</h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
          <Link
            to="/work"
            className="hidden md:block text-gray-400 hover:text-white transition-colors"
          >
            View Full Archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -10 }}
              className="group bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <Link to={`/project/${p.id}`} state={{ from: "/" }}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-1">{p.title}</h3>
                <p className="text-gray-500 text-sm font-medium mb-6">
                  {p.role || "Developer"} · {p.year || "2024"}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/project/${p.id}`}
                    state={{ from: "/" }}
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
  );
};

export default SelectedWork;
