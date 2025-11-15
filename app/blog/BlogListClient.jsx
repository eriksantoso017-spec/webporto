"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Components";
import { ArrowUp, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";

export default function BlogListClient({
  blogPosts,
  allPosts = [],
  currentPage = 1,
  totalPages = 1,
  totalPosts = 0,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Filter posts based on search query - search through all posts, not just current page
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogPosts;
    }
    const query = searchQuery.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query)
    );
  }, [blogPosts, allPosts, searchQuery]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/blog?${params.toString()}`);
    scrollToTop();
  };

  // Parallax scroll animation for cards
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("parallax-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredPosts]);

  // Parallax scroll effect - subtle movement on scroll
  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardTop = rect.top;
        const cardHeight = rect.height;

        // Calculate parallax offset based on scroll position
        // Only apply if card is visible and has been revealed
        if (ref.classList.contains("parallax-revealed")) {
          if (cardTop < windowHeight && cardTop > -cardHeight) {
            const scrollProgress =
              (windowHeight - cardTop) / (windowHeight + cardHeight);
            const parallaxOffset = (scrollProgress - 0.5) * 20; // Subtle parallax (20px max)
            ref.style.setProperty("--parallax-offset", `${parallaxOffset}px`);
          }
        }
      });
    };

    // Disable parallax on mobile for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [filteredPosts]);

  return (
    <>
      <div className="min-h-screen p-8 bg-black blog-background font-open-sans">
        <Button
          onClick={() => router.push("/")}
          className="close-btn fixed top-4 left-4 z-[100] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center rounded-lg animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 group"
        >
          <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden md:inline">Close</span>
        </Button>
        <div className="max-w-7xl mx-auto blog-content">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Blog Posts
          </h1>
          <div className="flex gap-4 relative">
            {/* Main Content - Vertical Layout */}
            <div className="flex-1 max-w-[531px] mx-auto md:mx-0 md:ml-[60px]">
              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    {searchQuery
                      ? "No blog posts found matching your search."
                      : "No blog posts available."}
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <div
                      key={post.id}
                      ref={(el) => (cardRefs.current[index] = el)}
                      className="relative group w-full parallax-card"
                    >
                      {/* Glow effect - positioned relative to card wrapper, follows card height */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                      <div className="relative bg-black rounded-lg overflow-hidden border border-gray-800 flex flex-col">
                        {/* Thumbnail Image */}
                        {post.thumbnail && (
                          <div className="w-full h-64 overflow-hidden">
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors font-merriweather">
                            {post.title}
                          </h2>

                          <p className="text-gray-300 line-clamp-3 flex-1 font-pt-sans">
                            {post.excerpt}
                          </p>

                          <Link
                            href={`/blog/${post.id}`}
                            className="mt-auto read-more-link"
                          >
                            <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-200 ease-out">
                              Read More →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination Controls */}
              {!searchQuery && totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>
                  <div className="text-gray-400 text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Minimalistic Search Bar - Fixed Position */}
      <div className="hidden lg:block fixed top-36 left-[calc((100vw-min(1280px,100vw))/2+60px+531px+16px+90px)] w-72 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center pointer-events-none">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        {searchQuery && (
          <div className="mt-3 text-sm text-gray-400 text-center">
            {filteredPosts.length} result
            {filteredPosts.length !== 1 ? "s" : ""}
          </div>
        )}
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
