import React from "react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-white uppercase tracking-wider">
          The Studio
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          <span className="text-white font-bold">AnaMdTech Solutions</span> is a
          digital engineering firm founded by Ana Mohammed.
        </p>

        <p className="text-gray-400 text-lg leading-relaxed mb-12">
          We don't just write code; we{" "}
          <span className="text-primary">engineer digital ecosystems</span>.
          Bridging the gap between complex backend logic and immersive frontend
          experiences, AnaMdTech operates at the{" "}
          <span className="text-white font-bold">
            top 1% of engineering standards
          </span>
          —delivering strict typing, automated reliability, and scalable cloud
          infrastructure for visionary clients.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "TypeScript Systems",
            "React Architecture",
            "Node.js Scaling",
            "Cloud Native",
          ].map((skill) => (
            <div
              key={skill}
              className="p-4 border border-white/10 rounded-lg hover:border-primary/50 hover:bg-white/5 transition-all cursor-default text-sm font-medium tracking-wide"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
