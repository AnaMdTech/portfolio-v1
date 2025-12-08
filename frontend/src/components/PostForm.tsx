import React, { useState, useEffect } from "react";
import { PenTool, Image as ImageIcon, Loader, X, Edit3 } from "lucide-react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

interface PostFormProps {
  onSuccess: () => void;
  initialData?: any; // <--- ADDED THIS
}

const PostForm = ({ onSuccess, initialData }: PostFormProps) => {
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    authorName: user?.name,
    authorImage: user?.profileImage,
    tags: "",
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // --- CRITICAL FIX: SYNC FORM WHEN EDITING ---
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
        imageUrl: initialData.imageUrl || "",
        authorName: initialData.authorName || user?.name || "Admin",
        authorImage: initialData.authorImage || user?.profileImage || "",
        // Convert Array to String for input
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(", ")
          : initialData.tags || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        imageUrl: "",
        tags: "",
        authorName: user?.name,
        authorImage: user?.profileImage,
      });
    }
  }, [initialData, user]);
  // ---------------------------------------------

  const isEditing = !!initialData?.id;

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "portfolio_preset");
    const cloudName = "dunnnyal2";

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();
      setFormData((prev) => ({ ...prev, imageUrl: json.secure_url }));
    } catch (err) {
      alert("Cover Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Format Tags
    const tagArray = formData.tags
      .split(",")
      .map((t) => {
        let tag = t.trim();
        if (!tag) return "";
        if (!tag.startsWith("#")) tag = "#" + tag;
        return tag;
      })
      .filter((t) => t !== "");

    const payload = { ...formData, tags: tagArray };

    try {
      if (isEditing) {
        // UPDATE
        await api.put(`/posts/${initialData.id}`, payload);
      } else {
        // CREATE
        await api.post("/posts", payload);
      }

      if (!isEditing) {
        setFormData({
          title: "",
          content: "",
          imageUrl: "",
          authorName: "",
          authorImage: "",
          tags: "",
        });
      }
      onSuccess();
    } catch (err) {
      alert("Failed to publish");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-xl border border-white/10 mb-8">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        {isEditing ? (
          <>
            <Edit3 className="text-secondary" /> Edit Article
          </>
        ) : (
          <>
            <PenTool className="text-secondary" /> Write New Article
          </>
        )}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Article Title"
          className="w-full bg-black/50 p-4 rounded border border-white/10 focus:border-secondary outline-none text-white text-lg font-bold"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Cover Image */}
        <div className="relative">
          {formData.imageUrl ? (
            <div className="relative h-12 w-full bg-black/50 border border-green-500/50 rounded flex items-center px-3">
              <span className="text-green-400 text-sm truncate flex-1">
                Cover Image Ready
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
              className={`flex items-center justify-center gap-2 h-12 w-full bg-black/50 border border-dashed border-white/30 rounded cursor-pointer hover:border-secondary ${
                uploading ? "opacity-50" : ""
              }`}
            >
              {uploading ? <Loader className="animate-spin" /> : <ImageIcon />}
              <span className="text-sm">
                {uploading ? "Uploading..." : "Upload Cover Image"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </label>
          )}
        </div>

        <textarea
          placeholder="Write in Markdown... (# Header, **Bold**)"
          className="w-full h-64 bg-black/50 p-4 rounded border border-white/10 focus:border-secondary outline-none text-white font-mono text-sm leading-relaxed"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />

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

        <input
          placeholder="Tags (comma separated): AI, Browser, Tech"
          className="w-full bg-black/50 p-4 rounded border border-white/10 focus:border-secondary outline-none text-white"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />

        <button
          disabled={submitting}
          className="w-full py-3 bg-secondary text-white font-bold rounded hover:opacity-90"
        >
          {submitting
            ? "Processing..."
            : isEditing
            ? "Update Article"
            : "Publish Article"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
