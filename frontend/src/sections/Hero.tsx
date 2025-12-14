import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Globe } from "lucide-react";

const Hero = () => {
  return (
    // 🛠 FIX: Used 'pt-32' (128px) on ALL screens to clear the fixed Navbar.
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
      {/* Background Glows */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-primary text-[10px] md:text-xs font-bold tracking-widest mb-6">
            SYSTEM ONLINE // ANAMDTECH
          </div>

          <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6">
            WE ENGINEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              THE FUTURE
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            A high-performance digital studio specializing in scalable
            architecture, modern interfaces, and artificial intelligence
            solutions.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="#work"
              className="px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              VIEW CASE STUDIES <ArrowRight size={20} />
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border border-white/20 rounded hover:bg-white/10 transition-colors text-center"
            >
              HIRE US
            </a>
          </div>
        </motion.div>

        {/* Abstract Tech Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:grid grid-cols-2 gap-4"
        >
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-12">
            <Code className="text-primary mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Frontend</h3>
            <p className="text-gray-400 text-sm">
              React, Tailwind, Framer Motion
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <Database className="text-secondary mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Backend</h3>
            <p className="text-gray-400 text-sm">Node, PostgreSQL, Prisma</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm col-span-2">
            <Globe className="text-green-400 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Cloud Native</h3>
            <p className="text-gray-400 text-sm">Docker, CI/CD, AWS, Vercel</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
