import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import api from "../api/axios"; // <--- Import Axios
import { usePageTitle } from "../hooks/usePageTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  usePageTitle("Contact"); // Set the page title to "Contact"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Send data to backend
      await api.post("/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-12">
        <h1 className="text-5xl font-bold mb-8 text-center">
          ESTABLISH UPLINK
        </h1>

        {status === "success" ? (
          <div className="bg-green-500/10 border border-green-500 rounded-2xl p-12 text-center animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-400">
              Message Transmitted
            </h2>
            <p className="text-gray-400 mt-2">
              AnaMdTech has been notified via secure channel.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm underline hover:text-white"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm space-y-6"
          >
            {/* Error Message */}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded border border-red-400/20">
                <AlertCircle size={20} /> Failed to transmit. Systems offline.
              </div>
            )}

            <div>
              <label className="block text-gray-400 mb-2 text-sm uppercase tracking-widest">
                Identity
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/50 border border-white/10 p-4 rounded-lg focus:border-primary outline-none text-white transition-colors"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm uppercase tracking-widest">
                Frequency (Email)
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-black/50 border border-white/10 p-4 rounded-lg focus:border-primary outline-none text-white transition-colors"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm uppercase tracking-widest">
                Payload (Message)
              </label>
              <textarea
                placeholder="Project details..."
                rows={5}
                className="w-full bg-black/50 border border-white/10 p-4 rounded-lg focus:border-primary outline-none text-white transition-colors"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              disabled={status === "loading"}
              className="w-full py-4 bg-primary text-black font-bold text-lg rounded-lg hover:bg-cyan-400 transition-colors flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] disabled:opacity-50"
            >
              {status === "loading" ? (
                "TRANSMITTING..."
              ) : (
                <>
                  <Send size={20} /> TRANSMIT DATA
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
