import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* The Icon: A Hexagon with A/M initials and a circuit node */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] transition-all duration-300"
      >
        {/* Hexagon Shape */}
        <path
          d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 Z"
          stroke="#00f3ff"
          strokeWidth="4"
          className="group-hover:stroke-[#bd00ff] transition-colors duration-500"
          fill="rgba(0, 243, 255, 0.1)"
        />
        {/* Tech Circuit Lines */}
        <path d="M50 50 L50 20" stroke="white" strokeWidth="3" />
        <path d="M50 50 L25 65" stroke="white" strokeWidth="3" />
        <path d="M50 50 L75 65" stroke="white" strokeWidth="3" />
        {/* Central Core */}
        <circle cx="50" cy="50" r="6" fill="#bd00ff" />
      </svg>

      {/* The Text Brand */}
      <div className="flex flex-col leading-none">
        <span className="font-bold text-xl tracking-tighter text-white">
          ANAMD<span className="text-primary">TECH</span>
        </span>
        <span className="text-[10px] text-gray-400 tracking-[0.3em] group-hover:text-secondary transition-colors">
          SOLUTIONS
        </span>
      </div>
    </div>
  );
};

export default Logo;
