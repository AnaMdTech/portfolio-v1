import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  usePageTitle("Admin Login"); // Set the page title to "Admin Login"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/admin"); // Redirect to Dashboard
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">
          Access Terminal
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Identify yourself, Admin.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-blue-600 font-bold text-black hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,243,255,0.3)]"
          >
            INITIALIZE SESSION
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
