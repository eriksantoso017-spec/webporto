"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Components";
import { ArrowUp, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useIsMobileDevice } from "@/hooks/useDeviceType";

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
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const isMobileDevice = useIsMobileDevice();

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
    if (isMobileDevice) return;

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
  }, [filteredPosts, isMobileDevice]);

  // Handle search bar minimize on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Minimize search bar when scrolled more than 100px
      if (scrollY > 100) {
        setIsSearchExpanded(false);
      } else {
        setIsSearchExpanded(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen p-8 bg-black blog-background font-open-sans blog-tab-container">
        <Button
          onClick={() => router.push("/")}
          className="close-btn fixed top-4 left-4 z-[100] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center rounded-lg animate-pulse-slow transition-all duration-300 group"
        >
          <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden md:inline">Close</span>
        </Button>
        <div className="max-w-7xl mx-auto blog-content">
          {/* Header with Title and Search Bar */}
          <div className="relative mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 relative">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                Blog <span className="text-purple-500">Posts</span>
              </h1>
              {/* Search Bar - Sejajar dengan judul di desktop, absolute di kanan */}
              <div className="hidden lg:flex items-center gap-2 absolute right-0">
                {/* Search Input - Minimizes on scroll */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? "w-[202px] opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 text-sm"
                  />
                </div>
                {/* Search Icon Button - Always visible, clickable to expand */}
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="w-[34px] h-[34px] bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-purple-700 shadow-lg flex-shrink-0"
                  aria-label="Search"
                >
                  <Search className="w-[14px] h-[14px] text-white" />
                </button>
              </div>
              {/* Search Results - Only show when expanded and has query */}
              {isSearchExpanded && searchQuery && (
                <div className="hidden lg:block absolute top-full right-0 mt-2 text-xs text-gray-400 text-right">
                  {filteredPosts.length} result
                  {filteredPosts.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>

          {/* Grid Layout - 4 Cards per Row */}
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              {searchQuery
                ? "No blog posts found matching your search."
                : "No blog posts available."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="group cursor-pointer parallax-card"
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Thumbnail - 289x289px */}
                  <div className="w-[289px] h-[289px] mx-auto mb-4 overflow-hidden rounded-lg">
                    {post.thumbnail ? (
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={289}
                        height={289}
                        className="w-full h-full object-cover transition-transform duration-500"
                        loading="lazy"
                        quality={85}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Title and Date Container - Centered for mobile */}
                  <div className="w-[289px] mx-auto sm:w-auto">
                    {/* Title */}
                    <h2 className="text-lg font-bold text-white mb-2 font-merriweather line-clamp-2 group-hover:text-purple-400 transition-colors text-center sm:text-left">
                      {post.title}
                    </h2>

                    {/* Date */}
                    <p className="text-sm text-gray-400 font-pt-sans text-center sm:text-left">
                      {post.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls - Only show if total posts > 12 */}
          {!searchQuery && totalPosts > 12 && totalPages > 1 && (
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
      <Button
        onClick={scrollToTop}
        className="back-to-top-btn fixed bottom-4 right-4 md:right-[28px] z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 md:w-[48.02px] md:h-[48.02px] p-0 flex items-center justify-center rounded-lg animate-float transition-all duration-300 group"
      >
        <ArrowUp className="w-5 h-5 md:w-[20.08px] md:h-[20.08px] animate-icon-bounce group-hover:animate-none transition-transform duration-300" />
      </Button>
    </>
  );
}
