import React from "react";
import { Github, Linkedin, Instagram, Mail, FileText } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10 mt-24 relative overflow-hidden">
      {/* Brand Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-20">
          {/* Column 1: Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm text-base">
              **AnaMdTech Solutions.** <br />A high-performance digital
              engineering studio. We merge complex backend logic with immersive
              frontend design to build scalable, AI-powered ecosystems.
            </p>

            <p className="text-gray-500 text-sm mt-4">
              📍 Headquarters: Ethiopia — Serving Global Clients
            </p>
          </div>

          {/* Column 2: Site Map */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Sitemap
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a
                  href="/#services"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Capabilities
                </a>
              </li>
              <li>
                <Link
                  to="/work"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  The Studio
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/anamdtech"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/anamdtech"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/anamdtech"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:anamdtech@gmail.com"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-primary border border-primary/20 px-6 py-2 rounded-full hover:bg-primary hover:text-black transition-all font-bold"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} AnaMdTech Solutions. All systems operational.</p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
