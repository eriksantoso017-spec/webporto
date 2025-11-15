"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Components";
import { ArrowLeft, ArrowUp, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function BlogPostClient({ post }) {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen p-8 bg-black blog-background">
      <Button
        onClick={() => router.push("/")}
        className="close-btn fixed top-4 left-4 z-[100] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center rounded-lg animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 group"
      >
        <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden md:inline">Close</span>
      </Button>
      <Link href="/blog">
        <Button className="back-to-blog-btn fixed top-4 right-4 md:right-[9px] z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-pink-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 group">
          <ArrowLeft className="w-6 h-6 md:w-4 md:h-4 md:mr-1.5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="hidden md:inline">To Blog</span>
        </Button>
      </Link>
      <div className="max-w-5xl mx-auto blog-content">
        <article className="bg-gray-900 border-2 border-pink-500 rounded-xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
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

          <div className="border-t border-gray-700 pt-6">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
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
        className="back-to-top-btn fixed bottom-4 right-4 md:right-[28px] z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 md:w-[53.35px] md:h-[53.35px] p-0 flex items-center justify-center rounded-lg animate-float hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-purple-500/50"
      >
        <ArrowUp className="w-5 h-5 md:w-[22.31px] md:h-[22.31px] animate-icon-bounce group-hover:animate-none group-hover:scale-125 transition-transform duration-300" />
      </Button>
    </div>
  );
}
