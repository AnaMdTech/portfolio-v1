import React, { useState, useEffect } from "react";
import { Plus, Image as ImageIcon, Loader, X, Edit3 } from "lucide-react";
import api from "../api/axios";

interface ProjectData {
  id?: string;
  title: string;
  role: string;
  year: string;
  client?: string;
  description: string;
  imageUrl: string;
  liveLink: string;
  githubLink: string;
  techStack: string | string[];
  isFeatured: boolean;
}

interface ProjectFormProps {
  onSuccess: () => void;
  initialData?: ProjectData | null;
}

const ProjectForm = ({ onSuccess, initialData }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectData>({
    title: "",
    role: "",
    year: "",
    client: "",
    description: "",
    imageUrl: "",
    liveLink: "",
    githubLink: "",
    techStack: "",
    isFeatured: false,
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!initialData?.id;

  // SYNC form with initialData whenever it changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        role: initialData.role || "",
        year: initialData.year || "",
        client: initialData.client || "",
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
        liveLink: initialData.liveLink || "",
        githubLink: initialData.githubLink || "",
        techStack: Array.isArray(initialData.techStack)
          ? initialData.techStack.join(", ")
          : initialData.techStack || "",
        isFeatured: initialData.isFeatured || false,
      });
    } else {
      // reset form when adding new project
      setFormData({
        title: "",
        role: "",
        year: "",
        client: "",
        description: "",
        imageUrl: "",
        liveLink: "",
        githubLink: "",
        techStack: "",
        isFeatured: false,
      });
    }
  }, [initialData]);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "portfolio_preset");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dunnnyal2/image/upload`,
        { method: "POST", body: data }
      );
      const fileJson = await res.json();
      setFormData((prev) => ({ ...prev, imageUrl: fileJson.secure_url }));
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      techStack: formData.techStack
        .toString()
        .split(",")
        .map((t) => t.trim()),
    };

    try {
      if (isEditing) {
        await api.put(`/projects/${initialData!.id}`, payload);
      } else {
        await api.post("/projects", payload);
        setFormData({
          title: "",
          role: "",
          year: "",
          client: "",
          description: "",
          imageUrl: "",
          liveLink: "",
          githubLink: "",
          techStack: "",
          isFeatured: false,
        });
      }
      onSuccess();
    } catch (err) {
      alert(`Failed to ${isEditing ? "update" : "create"} project`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-xl border border-white/10 mb-8">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        {isEditing ? (
          <>
            <Edit3 className="text-primary" /> Edit Project
          </>
        ) : (
          <>
            <Plus className="text-primary" /> Add New Project
          </>
        )}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="bg-black/50 p-3 rounded border border-white/10 text-white h-12"
            required
          />

          <div className="relative">
            {formData.imageUrl ? (
              <div className="relative h-12 w-full bg-black/50 border border-primary/50 rounded flex items-center px-3">
                <span className="text-green-400 text-sm truncate flex-1">
                  Image Uploaded
                </span>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-8 w-8 object-cover rounded ml-2"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: "" })}
                  className="ml-2 text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                className={`flex items-center justify-center gap-2 h-12 w-full bg-black/50 border border-dashed border-white/30 rounded cursor-pointer hover:border-primary ${
                  uploading ? "opacity-50" : ""
                }`}
              >
                {uploading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <ImageIcon size={20} />
                )}
                <span className="text-sm">
                  {uploading ? "Uploading..." : "Click to Upload"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* Role & Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="bg-black/50 p-3 rounded border border-white/10 text-white"
          />
          <input
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="bg-black/50 p-3 rounded border border-white/10 text-white"
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full bg-black/50 p-3 rounded border border-white/10 text-white h-24"
          required
        />

        {/* Tech Stack */}
        <input
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={(e) =>
            setFormData({ ...formData, techStack: e.target.value })
          }
          className="w-full bg-black/50 p-3 rounded border border-white/10 text-white"
          required
        />

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Live Link"
            value={formData.liveLink}
            onChange={(e) =>
              setFormData({ ...formData, liveLink: e.target.value })
            }
            className="bg-black/50 p-3 rounded border border-white/10 text-white"
          />
          <input
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={(e) =>
              setFormData({ ...formData, githubLink: e.target.value })
            }
            className="bg-black/50 p-3 rounded border border-white/10 text-white"
          />
        </div>

        {/* Helper Tool */}
        <div className="border-t border-white/10 pt-4 flex items-center gap-4">
          <label className="cursor-pointer px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-xs flex items-center gap-2">
            <ImageIcon size={14} /> Insert Body Image
            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "portfolio_preset");
                try {
                  const res = await fetch(
                    `https://api.cloudinary.com/v1_1/dunnnyal2/image/upload`,
                    { method: "POST", body: data }
                  );
                  const json = await res.json();
                  navigator.clipboard.writeText(`![Image](${json.secure_url})`);
                  alert("Copied Markdown!");
                } catch (err) {
                  alert("Upload Failed");
                }
              }}
            />
          </label>
        </div>

        {/* Feature */}
        <div className="flex items-center gap-3 bg-black/30 p-4 rounded border border-white/10 mb-6">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.checked })
            }
            className="w-5 h-5 accent-primary"
          />
          <label className="text-white font-bold">Feature on Home Page?</label>
        </div>

        <button
          type="submit"
          disabled={submitting || uploading}
          className="px-6 py-2 bg-primary text-black font-bold rounded w-full"
        >
          {submitting
            ? "Processing..."
            : isEditing
            ? "Update Project"
            : "Deploy Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
