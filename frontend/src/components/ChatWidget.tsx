import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

interface Message {
  role: "user" | "ai";
  text: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Greetings. I am AnaMdTech's AI Assistant. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", { message: userMsg });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Connection error. Systems offline." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-black/90 border border-primary/30 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.1)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary/10 p-4 border-b border-primary/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cpu className="text-primary animate-pulse" size={18} />
                <span className="font-bold text-sm tracking-widest text-primary">
                  AI UPLINK
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-black font-medium rounded-tr-none"
                        : "bg-white/10 text-gray-200 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-xs text-primary animate-pulse">
                    Computing...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-white/10 bg-white/5 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my tech stack..."
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button
                disabled={loading}
                type="submit"
                className="bg-primary text-black p-2 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)] border border-white/20"
      >
        {isOpen ? (
          <X className="text-black" />
        ) : (
          <MessageSquare className="text-black" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
