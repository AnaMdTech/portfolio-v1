import React from "react";
import { Github, Linkedin, Instagram, Mail, FileText } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10 mt-24 relative overflow-hidden">
      {/* Futuristic Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-20">
          {/* Column 1: About */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm text-base">
              Full Stack Engineer building intelligent applications that merge
              beautiful design with scalable architecture. Focused on AI-powered
              experiences and future-ready technology.
            </p>

            <p className="text-gray-500 text-sm mt-4">
              📍 Based in Ethiopia — Open for Remote Work
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Explore
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/work"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Work / Archive
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials */}
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

            {/* Resume Button Moved Here for Visibility */}
            <div className="mt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
              >
                <FileText size={16} /> View Resume
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} AnaMdTech. Systems operational.</p>
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
