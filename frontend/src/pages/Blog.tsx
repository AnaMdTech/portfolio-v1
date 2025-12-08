import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { usePageTitle } from "../hooks/usePageTitle";
import Loading from "../components/Loading";

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/posts").then((res) => {
      setPosts(res.data.data || []); // <--- Set the posts
    }).catch((err) => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  usePageTitle("Blog"); // Set the page title to "Blog"

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <h1 className="text-5xl font-bold mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            BLOG
          </span>
        </h1>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/50 transition-all flex flex-col"
              >
                {/* IMAGE and TITLE (go to blog details) */}
                <Link to={`/blog/${post.id}`}>
                  <div className="h-56 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold mb-6 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  {/* AUTHOR IG LINK */}
                  <a
                    href="https://www.instagram.com/anamdtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border-t border-white/5 pt-4 hover:opacity-75"
                  >
                    <img
                      src={post.authorImage}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
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
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
