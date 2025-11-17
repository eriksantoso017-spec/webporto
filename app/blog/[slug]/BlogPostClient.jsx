"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Components";
import { ArrowLeft, ArrowUp, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";

export default function BlogPostClient({ post }) {
  const router = useRouter();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const scrollableHeight = documentHeight - windowHeight;
      const percentage = scrollableHeight > 0 
        ? Math.round((scrollTop / scrollableHeight) * 100)
        : 0;
      
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black blog-background font-open-sans blog-tab-container">
      <Button
        onClick={() => router.push("/")}
        className="close-btn fixed top-4 left-4 z-[100] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center rounded-lg animate-pulse-slow hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 group"
      >
        <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden md:inline">Close</span>
      </Button>
      <Link href="/blog">
        <Button className="back-to-blog-btn fixed top-4 right-4 md:right-[9px] z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-pink-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 group">
          <ArrowLeft className="w-6 h-6 md:w-4 md:h-4 md:mr-1.5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="hidden md:inline">To Blog</span>
        </Button>
      </Link>
      <div className="mx-4 md:mx-[331px] blog-content">
        <article className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white font-merriweather">
            {post.title}
          </h1>

          {/* Thumbnail Image */}
          {post.thumbnail && (
            <div className="w-full flex justify-center my-6">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full max-w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          )}

          <div className="pt-6">
            <p className="text-xl text-gray-300 leading-relaxed mb-6 font-pt-sans">
              {post.excerpt}
            </p>
            <div className="text-gray-300 leading-relaxed space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white prose-code:text-pink-400 prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:bg-gray-800/50 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-200 prose-blockquote:italic max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
      <Button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="back-to-top-btn fixed bottom-4 right-4 md:right-[28px] z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 md:w-[48.02px] md:h-[48.02px] p-0 flex items-center justify-center rounded-lg transition-all duration-300 group shadow-lg hover:shadow-purple-500/50 animate-float"
      >
        {isHovered ? (
          <ArrowUp className="w-5 h-5 md:w-[20.08px] md:h-[20.08px] transition-transform duration-300" />
        ) : (
          <span className="text-[10px] md:text-[10.8px] font-semibold transition-opacity duration-300">
            {scrollPercentage}%
          </span>
        )}
      </Button>
    </div>
  );
}
