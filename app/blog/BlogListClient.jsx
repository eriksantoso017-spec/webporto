"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Components";
import { ArrowUp, X } from "lucide-react";

export default function BlogListClient({ blogPosts }) {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="min-h-screen p-8 bg-black blog-background">
        <Button
          onClick={() => router.push("/")}
          className="close-btn fixed top-4 left-4 z-[100] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center rounded-lg animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 group"
        >
          <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden md:inline">Close</span>
        </Button>
        <div className="max-w-5xl mx-auto blog-content">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Blog Posts
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.length === 0 ? (
              <div className="text-center text-gray-400 col-span-2">
                No blog posts available.
              </div>
            ) : (
              blogPosts.map((post) => (
                <div key={post.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-black rounded-lg p-6 space-y-4 border border-gray-800">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-300 line-clamp-3">{post.excerpt}</p>

                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                        Read More →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={scrollToTop}
        className="back-to-top-btn fixed bottom-4 right-4 md:right-[28px] z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 md:w-[53.35px] md:h-[53.35px] p-0 flex items-center justify-center rounded-lg animate-float hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-purple-500/50"
      >
        <ArrowUp className="w-5 h-5 md:w-[22.31px] md:h-[22.31px] animate-icon-bounce group-hover:animate-none group-hover:scale-125 transition-transform duration-300" />
      </Button>
    </>
  );
}
