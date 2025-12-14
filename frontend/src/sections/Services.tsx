import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Globe } from "lucide-react";

const services = [
  {
    icon: <Code size={32} />,
    title: "Polyglot Architecture",
    description:
      "Engineering robust solutions using the best tool for the job. We specialize in high-performance Node.js APIs and data-heavy Django (Python) systems.",
    tags: ["React", "Node.js", "TypeScript", "Python/Django"],
    iconColor: "text-primary",
    // CHANGE 1: Use 'hover:' instead of 'group-hover:' for the container styles
    className:
      "hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] hover:border-primary/50",
  },
  {
    icon: <Cpu size={32} />,
    title: "AI & Intelligence",
    description:
      "Integrating Large Language Models (LLMs) into business logic. From context-aware chatbots to automated data processing pipelines.",
    tags: ["OpenAI API", "RAG", "Automation"],
    iconColor: "text-secondary",
    // CHANGE 2: Use 'hover:'
    className:
      "hover:shadow-[0_0_30px_rgba(189,0,255,0.15)] hover:border-secondary/50",
  },
  {
    icon: <Globe size={32} />,
    title: "Scalable Infrastructure",
    description:
      "Deploying cloud-native systems that scale. Utilizing Serverless databases and Edge networks for 99.9% uptime and global speed.",
    tags: ["Docker", "Neon DB", "Vercel"],
    iconColor: "text-green-400",
    // CHANGE 3: Use 'hover:'
    className:
      "hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] hover:border-green-400/50",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">CAPABILITIES</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl text-lg">
            AnaMdTech operates at the intersection of complex backend logic and immersive design. 
            We deliver digital ecosystems, not just websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              // 💡 THE GLOW MAGIC HAPPENS HERE:
              className={`group p-8 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${s.className}`}
            >
              <div className={`mb-6 ${s.iconColor} p-4 bg-white/5 rounded-xl w-fit border border-white/5 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10`}>
                {s.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8 min-h-[80px]">
                {s.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-white/5 rounded-full text-gray-300 border border-white/5 group-hover:border-white/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;