import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Matching the Archive style
import Navbar from "../components/Navbar";
import api from "../api/axios";
import Loading from "../components/Loading";
import SEO from "../components/SEO";

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  tags: string[];
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/posts")
      .then((res) => setPosts(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-secondary selection:text-white">
      <SEO
        title="Engineering Insights"
        description="Technical strategies, architectural patterns, and case studies on building scalable digital ecosystems."
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        {/* HEADER SECTION (Matching 'The Archive' style) */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-secondary mb-4 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Studio
          </Link>
          <h1 className="text-5xl font-bold mb-4">Engineering Insights</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Technical strategies, architectural patterns, and case studies on
            building scalable digital ecosystems.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <Loading />
        ) : (
          /* GRID SECTION */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                state={{ from: "/blog" }} // Pass state for "Back" button logic
                className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/50 transition-all flex flex-col"
              >
                {/* Image Top */}
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Bottom */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <div className="flex gap-2 flex-wrap mb-3">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider font-bold text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  {/* Author Footer (Aligned to bottom) */}
                  <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
                    <img
                      src={post.authorImage}
                      alt={post.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">
                        {post.authorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
