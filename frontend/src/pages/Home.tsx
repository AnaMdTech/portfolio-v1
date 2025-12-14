import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Globe } from "lucide-react";

// Import API
import api from "../api/axios";

// Import Hooks
// import { usePageTitle } from "../hooks/usePageTitle";

// Import Components
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";

// Import Sections
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import About from "../sections/About";
import SelectedWork from "../sections/SelectedWork";

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
  // usePageTitle("AnaMdTech Solutions");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects for the public grid
    api
      .get("/projects")
      .then((res) => {
        const featured = res.data.data.filter(
          (p: any) => p.isFeatured === true
        );
        setProjects(featured);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
      <SEO
        title="Home"
        description="AnaMdTech Solutions is a high-performance digital studio specializing in Scalable Architecture, AI Integration, and Modern UI."
      />

      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* SERVICE SECTION */}
      <Services />

      {/* PROJECTS SECTION */}
      <SelectedWork projects={projects} />

      {/* ABOUT SECTION */}
      <About />
    </div>
  );
};

export default Home;
