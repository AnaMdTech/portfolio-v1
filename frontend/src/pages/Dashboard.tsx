import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProjectForm from "../components/ProjectForm";
import PostForm from "../components/PostForm";
import { Trash2, Layout, PenTool, LogOut, X } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";

const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  usePageTitle("Admin Dashboard"); // Set the page title to "Admin Dashboard"

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch projects");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchPosts();
  }, []);

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this artifact?")) return;
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this artifact?")) return;
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Command Center
          </h1>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-red-400 hover:text-red-300 flex items-center gap-2"
          >
            <LogOut size={18} /> Terminate
          </button>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-1">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${
              activeTab === "projects"
                ? "bg-primary text-black"
                : "bg-white/5 text-gray-400"
            }`}
          >
            <Layout size={18} /> Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${
              activeTab === "blog"
                ? "bg-secondary text-white"
                : "bg-white/5 text-gray-400"
            }`}
          >
            <PenTool size={18} /> Manage Blog
          </button>
        </div>

        {/* --- PROJECTS TAB --- */}
        {activeTab === "projects" ? (
          <div className="animate-in fade-in duration-500">
            {/* EDITING BANNER */}
            {editingProject && (
              <div className="bg-blue-500/10 border border-blue-500 text-blue-400 p-3 rounded mb-4 flex justify-between items-center">
                <span>
                  Editing: <strong>{editingProject.title}</strong>
                </span>
                <button
                  onClick={() => setEditingProject(null)}
                  className="flex items-center gap-1 hover:text-white"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}

            {/* FORM: Pass initialData and handle success */}
            <ProjectForm
              initialData={editingProject}
              onSuccess={() => {
                fetchProjects();
                setEditingProject(null); // Clear edit mode
              }}
            />

            {/* LIST */}
            <h2 className="text-2xl font-bold mb-6 mt-12">
              Active Artifacts ({projects.length})
            </h2>
            <div className="space-y-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-primary/30 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <p className="text-xs text-gray-400">
                      {p.role || "Developer"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500 hover:text-white"
                    >
                      <PenTool size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- BLOG TAB --- */
          <div className="animate-in fade-in duration-500">
            {/* EDITING BANNER */}
            {editingPost && (
              <div className="bg-purple-500/10 border border-purple-500 text-purple-400 p-3 rounded mb-4 flex justify-between items-center">
                <span>
                  Editing: <strong>{editingPost.title}</strong>
                </span>
                <button
                  onClick={() => setEditingPost(null)}
                  className="flex items-center gap-1 hover:text-white"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}

            <PostForm
              initialData={editingPost}
              onSuccess={() => {
                fetchPosts();
                setEditingPost(null);
              }}
            />

            <h2 className="text-2xl font-bold mb-6 mt-12">
              Active Artifacts ({posts.length})
            </h2>
            <div className="space-y-4">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-secondary/30 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <p className="text-xs text-gray-400">
                      {p.authorName} •{" "}
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500 hover:text-white"
                    >
                      <PenTool size={16} />
                    </button>
                    <button
                      onClick={() => handleDeletePost(p.id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
