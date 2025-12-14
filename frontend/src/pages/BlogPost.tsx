import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { Tag, ArrowLeft } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
import Loading from "../components/Loading";
import SEO from "../components/SEO";

// Define the shape of a Post
interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  tags: string[]; // <--- Crucial for recommendations
  createdAt: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch ALL posts (In a real large app, you'd fetch /posts/:id and /posts/:id/related)
        const res = await api.get("/posts");
        const allPosts: Post[] = res.data.data;

        // 2. Find the current post
        const currentPost = allPosts.find((p) => p.id === id);

        if (currentPost) {
          setPost(currentPost);

          // 3. THE RECOMMENDATION ALGORITHM
          // Filter posts that:
          // A. Are NOT the current post
          // B. Share at least ONE tag with the current post
          const currentTags = currentPost.tags || [];

          let matches = allPosts.filter((p) => {
            if (p.id === currentPost.id) return false; // Exclude self
            const otherTags = p.tags || [];
            // Check for overlap
            return otherTags.some((tag) => currentTags.includes(tag));
          });

          // 4. If no tag matches found, Fallback: Show the 2 most recent posts (optional)
          if (matches.length === 0) {
            matches = allPosts
              .filter((p) => p.id !== currentPost.id)
              .slice(0, 2);
          }

          // Limit to 3 recommendations max
          setRelated(matches.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-run if ID changes (e.g. clicking a related link)

  usePageTitle(post?.title || "Blog Post"); // Set the page title to the post title

  // Determine Back Path
  const backPath = location.state?.from === "/blog" ? "/blog" : "/";
  const backLabel =
    location.state?.from === "/blog" ? "Back to Insights" : "Back to Studio";

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!post)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Article Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-white selection:bg-secondary selection:text-white">
      {post && (
        <SEO
          title={post.title}
          description={post.content.substring(0, 150) + "..."}
          image={post.imageUrl}
          type="article"
          url={`/blog/${post.id}`}
        />
      )}

      <Navbar />

      {/* HEADER / BACK BUTTON OVERLAY */}
      <div className="absolute top-24 left-6 z-30">
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-black/40"
        >
          <ArrowLeft size={16} /> {backLabel}
        </Link>
      </div>

      {/* --- HERO IMAGE SECTION --- */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <img
          src={post.imageUrl}
          className="w-full h-full object-cover"
          alt={post.title}
        />

        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 max-w-4xl mx-auto">
          {/* Tags Badge */}
          <div className="flex gap-2 mb-4">
            {post.tags &&
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(189,0,255,0.4)]"
                >
                  {tag}
                </span>
              ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl leading-tight">
            {post.title}
          </h1>

          <Link
            to="https://www.instagram.com/anamdtech/"
            target="_blank"
            className="flex items-center gap-4 hover:opacity-75"
          >
            <img
              src={post.authorImage}
              className="w-12 h-12 rounded-full border-2 border-secondary object-cover"
              alt="Author"
            />
            <div>
              <p className="font-bold text-lg text-white">{post.authorName}</p>
              <p className="text-gray-300 text-sm">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-secondary prose-a:text-secondary prose-img:rounded-xl prose-img:border prose-img:border-white/10">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <hr className="border-t border-white/10 my-12 w-full max-w-3xl mx-auto" />

      {/* TAG LIST UNDER CONTENT */}
      <div className="max-w-3xl mx-auto px-6 pb-10 flex items-center gap-3 flex-wrap">
        <Tag className="text-secondary" />

        {post.tags &&
          post.tags.map((t) => (
            <span
              key={t}
              className="bg-white/5 border border-secondary/40 text-secondary text-xs px-3 py-1 rounded-full font-medium shadow-[0_0_8px_rgba(189,0,255,0.3)] hover:bg-secondary hover:text-white hover:shadow-[0_0_15px_rgba(189,0,255,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {t}
            </span>
          ))}
      </div>

      {/* --- YOU MIGHT ALSO LIKE (RELATED POSTS) --- */}
      {related.length > 0 && (
        <section className="bg-surface/30 border-t border-white/10 py-20 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.id}`}
                  onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicking
                  className="group block h-full"
                >
                  {/* Card Image */}
                  <div className="h-48 overflow-hidden rounded-xl mb-4 border border-white/10 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={p.imageUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={p.title}
                    />
                  </div>

                  {/* Card Text */}
                  <h3 className="font-bold text-xl leading-tight mb-3 group-hover:text-secondary transition-colors">
                    {p.title}
                  </h3>

                  {/* Matching Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {p.tags &&
                      p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-white/5 text-gray-400 border border-white/10 px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
