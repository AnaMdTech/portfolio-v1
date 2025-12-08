import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <Loader className="animate-spin text-primary relative z-10" size={48} />
      </div>
      <p className="text-gray-400 text-sm tracking-widest animate-pulse">
        INITIALIZING DATA STREAM...
      </p>
    </div>
  );
};

export default Loading;
