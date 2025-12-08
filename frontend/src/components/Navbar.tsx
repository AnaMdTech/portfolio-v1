import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo"; // <--- Import your new logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* BRAND */}
        <Link to="/">
          <Logo />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#projects"
            className="text-gray-300 hover:text-primary transition-colors text-sm font-medium tracking-widest"
          >
            SELECTED
          </a>
          <a
            href="/#about"
            className="text-gray-300 hover:text-primary transition-colors text-sm font-medium tracking-widest"
          >
            ABOUT
          </a>
          <Link
            to="/blog"
            className="text-gray-300 hover:text-primary transition-colors text-sm font-medium tracking-widest"
          >
            BLOG
          </Link>
          <Link
            to="/work"
            className="text-gray-300 hover:text-primary transition-colors text-sm font-medium tracking-widest"
          >
            ARCHIVE
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all rounded text-sm font-bold shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]"
          >
            INITIATE CONTACT
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-black/95 backdrop-blur-xl border-b border-white/10 p-8 flex flex-col gap-8 md:hidden z-40">
          <a
            href="/#projects"
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white hover:text-primary"
          >
            SELECTED
          </a>
          <a
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white hover:text-primary"
          >
            ABOUT
          </a>
          <Link
            to="/blog"
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white hover:text-primary"
          >
            BLOG
          </Link>
          <Link
            to="/work"
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white hover:text-primary"
          >
            ARCHIVE
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-2xl text-primary font-bold"
          >
            CONTACT ME
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
