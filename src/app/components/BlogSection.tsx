import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  ChevronDown,
  X,
  Heart,
  Share2,
  Bookmark,
  Link2,
  Check,
} from "lucide-react";
import blogPosts, {
  type BlogPost,
  categoryConfig,
  getCategoryColor,
  getCategoryIcon,
} from "../data/blog-posts";

const categories = categoryConfig.map((c) => c.label);

export function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);

  // Close share menu on outside click
  useEffect(() => {
    if (!shareMenuOpen) return;
    const handleClick = () => setShareMenuOpen(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [shareMenuOpen]);

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, 4);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleShare = (post: BlogPost) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${post.id}`;
    try {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShareToast(post.id);
      setShareMenuOpen(null);
      setTimeout(() => setShareToast(null), 2000);
    } catch {
      if (navigator.share) {
        navigator.share({ title: post.title, url }).catch(() => {});
      }
    }
  };

  const shareToTwitter = (post: BlogPost) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${post.id}`;
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank");
    setShareMenuOpen(null);
  };

  const shareToLinkedIn = (post: BlogPost) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${post.id}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    setShareMenuOpen(null);
  };

  const ShareMenu = ({ post, position = "bottom" }: { post: BlogPost; position?: "bottom" | "top" }) => (
    <AnimatePresence>
      {shareMenuOpen === post.id && (
        <motion.div
          initial={{ opacity: 0, y: position === "bottom" ? -8 : 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === "bottom" ? -8 : 8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={`absolute ${position === "bottom" ? "bottom-full mb-2" : "top-full mt-2"} right-0 z-10 bg-slate-800 border border-slate-700/60 rounded-xl shadow-xl overflow-hidden min-w-[180px]`}
        >
          <button
            onClick={() => handleShare(post)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
            style={{ fontSize: "13px" }}
          >
            <Link2 className="w-4 h-4 text-emerald-400" />
            Copy Link
          </button>
          <button
            onClick={() => shareToTwitter(post)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
            style={{ fontSize: "13px" }}
          >
            <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>
          <button
            onClick={() => shareToLinkedIn(post)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
            style={{ fontSize: "13px" }}
          >
            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-emerald-400" style={{ fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3);
        return (
          <pre
            key={i}
            className="bg-slate-950 border border-slate-700/50 rounded-lg px-4 py-3 my-3 overflow-x-auto"
            style={{ fontSize: "12px", lineHeight: 1.6 }}
          >
            <code className="text-emerald-300">{code}</code>
          </pre>
        );
      }
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </span>
      ));
    });
  };

  return (
    <section id="blog" className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span
              className="text-emerald-400 tracking-widest uppercase"
              style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}
            >
              Blog & Insights
            </span>
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700 }}>
            Thoughts on <span className="text-emerald-400">AI/ML</span> &{" "}
            <span className="text-emerald-400">Software Engineering</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            Sharing practical insights, lessons learned from building production AI systems, and perspectives on the
            evolving tech landscape.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat
                  ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400"
                  : "bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600"
              }`}
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {cat !== "All" && (() => {
                const Icon = getCategoryIcon(cat);
                return Icon ? <Icon className="w-3.5 h-3.5" /> : null;
              })()}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group bg-slate-800/30 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-slate-600/60 transition-all ${
                  post.featured ? "ring-1 ring-emerald-500/20" : ""
                }`}
              >
                {/* Category Bar */}
                <div
                  className="h-1"
                  style={{ backgroundColor: getCategoryColor(post.category) || "#34d399" }}
                />

                <div className="p-6">
                  {/* Meta Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2.5 py-1 rounded-full border flex items-center gap-1.5"
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: getCategoryColor(post.category),
                          backgroundColor: `${getCategoryColor(post.category)}15`,
                          borderColor: `${getCategoryColor(post.category)}30`,
                        }}
                      >
                        {(() => {
                          const Icon = getCategoryIcon(post.category);
                          return Icon ? <Icon className="w-3 h-3" /> : null;
                        })()}
                        {post.category}
                      </span>
                      {post.featured && (
                        <span
                          className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          style={{ fontSize: "10px", fontWeight: 600 }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500" style={{ fontSize: "11px" }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-white mb-3 group-hover:text-emerald-400 transition-colors"
                    style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.4 }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 mb-4" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-700/40 text-slate-400"
                        style={{ fontSize: "11px" }}
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                    <button
                      onClick={() => setExpandedPost(post.id)}
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      style={{ fontSize: "13px", fontWeight: 500 }}
                    >
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          likedPosts.has(post.id)
                            ? "text-red-400 bg-red-500/10"
                            : "text-slate-500 hover:text-red-400 hover:bg-slate-700/50"
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          savedPosts.has(post.id)
                            ? "text-amber-400 bg-amber-500/10"
                            : "text-slate-500 hover:text-amber-400 hover:bg-slate-700/50"
                        }`}
                      >
                        <Bookmark className="w-4 h-4" fill={savedPosts.has(post.id) ? "currentColor" : "none"} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShareMenuOpen(shareMenuOpen === post.id ? null : post.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            shareToast === post.id
                              ? "text-emerald-400 bg-emerald-500/10"
                              : "text-slate-500 hover:text-emerald-400 hover:bg-slate-700/50"
                          }`}
                        >
                          {shareToast === post.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Share2 className="w-4 h-4" />
                          )}
                        </button>
                        <ShareMenu post={post} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More */}
        {filtered.length > 4 && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 border border-slate-700/40 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 rounded-xl transition-all cursor-pointer"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Show All Articles
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Expanded Article Modal */}
        <AnimatePresence>
          {expandedPost && (() => {
            const post = blogPosts.find((p) => p.id === expandedPost);
            if (!post) return null;
            return (
              <motion.div
                key="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-10 px-4"
                onClick={() => setExpandedPost(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-900 border border-slate-700/60 rounded-2xl max-w-3xl w-full shadow-2xl"
                >
                  {/* Modal Header */}
                  <div
                    className="h-1.5 rounded-t-2xl"
                    style={{ backgroundColor: getCategoryColor(post.category) }}
                  />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="px-2.5 py-1 rounded-full border flex items-center gap-1.5"
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              color: getCategoryColor(post.category),
                              backgroundColor: `${getCategoryColor(post.category)}15`,
                              borderColor: `${getCategoryColor(post.category)}30`,
                            }}
                          >
                            {post.category}
                          </span>
                          <span className="text-slate-500 flex items-center gap-1" style={{ fontSize: "12px" }}>
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="text-slate-500 flex items-center gap-1" style={{ fontSize: "12px" }}>
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-white" style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.3 }}>
                          {post.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setExpandedPost(null)}
                        className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/40"
                          style={{ fontSize: "11px" }}
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Content */}
                    <div
                      className="text-slate-300 prose-invert"
                      style={{ fontSize: "14.5px", lineHeight: 1.85 }}
                    >
                      {renderMarkdown(post.content)}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/40">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            likedPosts.has(post.id)
                              ? "text-red-400 bg-red-500/10"
                              : "text-slate-400 hover:text-red-400 bg-slate-800"
                          }`}
                          style={{ fontSize: "13px" }}
                        >
                          <Heart className="w-4 h-4" fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                          {likedPosts.has(post.id) ? "Liked" : "Like"}
                        </button>
                        <button
                          onClick={() => toggleSave(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            savedPosts.has(post.id)
                              ? "text-amber-400 bg-amber-500/10"
                              : "text-slate-400 hover:text-amber-400 bg-slate-800"
                          }`}
                          style={{ fontSize: "13px" }}
                        >
                          <Bookmark className="w-4 h-4" fill={savedPosts.has(post.id) ? "currentColor" : "none"} />
                          {savedPosts.has(post.id) ? "Saved" : "Save"}
                        </button>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShareMenuOpen(shareMenuOpen === `modal-${post.id}` ? null : `modal-${post.id}`);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            shareToast === post.id
                              ? "text-emerald-400 bg-emerald-500/10"
                              : "text-slate-400 hover:text-emerald-400 bg-slate-800"
                          }`}
                          style={{ fontSize: "13px" }}
                        >
                          {shareToast === post.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Share2 className="w-4 h-4" />
                          )}
                          {shareToast === post.id ? "Copied!" : "Share"}
                        </button>
                        <AnimatePresence>
                          {shareMenuOpen === `modal-${post.id}` && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full mb-2 right-0 z-10 bg-slate-800 border border-slate-700/60 rounded-xl shadow-xl overflow-hidden min-w-[180px]"
                            >
                              <button
                                onClick={() => handleShare(post)}
                                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
                                style={{ fontSize: "13px" }}
                              >
                                <Link2 className="w-4 h-4 text-emerald-400" />
                                Copy Link
                              </button>
                              <button
                                onClick={() => shareToTwitter(post)}
                                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
                                style={{ fontSize: "13px" }}
                              >
                                <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Share on X
                              </button>
                              <button
                                onClick={() => shareToLinkedIn(post)}
                                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
                                style={{ fontSize: "13px" }}
                              >
                                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Share on LinkedIn
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Share Toast Notification */}
        <AnimatePresence>
          {shareToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              <Check className="w-4 h-4" />
              Link copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}