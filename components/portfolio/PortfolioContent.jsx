"use client";

import { useState, useEffect, useRef } from "react";
import { useIsMobileDevice } from "@/hooks/useDeviceType";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Components";
import { imageProjects, videoProjects } from "@/data/portfolioData";
import ImageProjectCard from "./ImageProjectCard";

const PortfolioContent = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [currentImagePage, setCurrentImagePage] = useState(1);
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [imageLoadMoreCount, setImageLoadMoreCount] = useState(0);
  const [videoLoadMoreCount, setVideoLoadMoreCount] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const portfolioTitleRef = useRef(null);
  const isMobileDevice = useIsMobileDevice();

  const itemsPerPage = 12;
  const initialItems = 12;
  const maxLoadMore = 2;

  // Track viewport width for responsive updates
  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth, { passive: true });

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  // Reset page and load more count when switching tabs
  useEffect(() => {
    setCurrentImagePage(1);
    setCurrentVideoPage(1);
    setImageLoadMoreCount(0);
    setVideoLoadMoreCount(0);
  }, [activeTab]);

  // Scroll ke judul tab Portfolio saat dibuka di mobile
  useEffect(() => {
    if (isMobileDevice && portfolioTitleRef.current) {
      setTimeout(() => {
        portfolioTitleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [isMobileDevice]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Load More and Pagination logic for images
  const totalImageItems = imageProjects.length;
  const imageItemsToShow = initialItems + imageLoadMoreCount * itemsPerPage;
  const shouldShowImageLoadMore =
    imageLoadMoreCount < maxLoadMore && imageItemsToShow < totalImageItems;
  const shouldShowImagePagination =
    imageLoadMoreCount >= maxLoadMore || imageItemsToShow >= 24;

  const displayedImageProjects = shouldShowImagePagination
    ? (() => {
        const totalImagePages = Math.ceil(totalImageItems / itemsPerPage);
        const startImageIndex = (currentImagePage - 1) * itemsPerPage;
        const endImageIndex = startImageIndex + itemsPerPage;
        return imageProjects.slice(startImageIndex, endImageIndex);
      })()
    : imageProjects.slice(0, imageItemsToShow);

  const totalImagePages = Math.ceil(totalImageItems / itemsPerPage);

  // Load More and Pagination logic for videos
  const totalVideoItems = videoProjects.length;
  const videoItemsToShow = initialItems + videoLoadMoreCount * itemsPerPage;
  const shouldShowVideoLoadMore =
    videoLoadMoreCount < maxLoadMore && videoItemsToShow < totalVideoItems;
  const shouldShowVideoPagination =
    videoLoadMoreCount >= maxLoadMore || videoItemsToShow >= 24;

  const displayedVideoProjects = shouldShowVideoPagination
    ? (() => {
        const totalVideoPages = Math.ceil(totalVideoItems / itemsPerPage);
        const startVideoIndex = (currentVideoPage - 1) * itemsPerPage;
        const endVideoIndex = startVideoIndex + itemsPerPage;
        return videoProjects.slice(startVideoIndex, endVideoIndex);
      })()
    : videoProjects.slice(0, videoItemsToShow);

  const totalVideoPages = Math.ceil(totalVideoItems / itemsPerPage);

  const handleImageLoadMore = () => {
    setImageLoadMoreCount((prev) => prev + 1);
  };

  const handleVideoLoadMore = () => {
    setVideoLoadMoreCount((prev) => prev + 1);
  };

  const handleImagePageChange = (newPage) => {
    setCurrentImagePage(newPage);
    scrollToTop();
  };

  const handleVideoPageChange = (newPage) => {
    setCurrentVideoPage(newPage);
    scrollToTop();
  };

  return (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={portfolioTitleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
        >
          My Portfolio
        </h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-transparent gap-4">
            <TabsTrigger
              value="images"
              className="text-gray-400 data-[state=active]:text-white pb-2 transition-all duration-300 bg-transparent border-b-2 border-transparent data-[state=active]:border-purple-500 hover:text-purple-400 hover:border-purple-400 cursor-pointer"
            >
              Image Gallery
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="text-gray-400 data-[state=active]:text-white pb-2 transition-all duration-300 bg-transparent border-b-2 border-transparent data-[state=active]:border-purple-500 hover:text-purple-400 hover:border-purple-400 cursor-pointer"
            >
              Video Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="images" className="space-y-6">
            <div className="portfolio-grid-container items-start max-w-full">
              {displayedImageProjects.map((project, index) => (
                <ImageProjectCard
                  key={`${project.id}-${viewportWidth}`}
                  project={project}
                  index={index}
                />
              ))}
            </div>
            {/* Load More Button for Images */}
            {shouldShowImageLoadMore && !shouldShowImagePagination && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleImageLoadMore}
                  className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  <span>Load More</span>
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            )}
            {/* Pagination Controls for Images */}
            {shouldShowImagePagination && totalImagePages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button
                  onClick={() => handleImagePageChange(currentImagePage - 1)}
                  disabled={currentImagePage === 1}
                  className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <div className="text-gray-400 text-sm">
                  Page {currentImagePage} of {totalImagePages}
                </div>
                <Button
                  onClick={() => handleImagePageChange(currentImagePage + 1)}
                  disabled={currentImagePage === totalImagePages}
                  className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="videos" className="space-y-6">
            {activeTab === "videos" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {displayedVideoProjects.map((project) => (
                    <div key={project.id} className="relative group self-start">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black rounded-xl p-6 space-y-4 border border-gray-800">
                        <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${project.youtubeId}`}
                            title={project.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Load More Button for Videos */}
                {shouldShowVideoLoadMore && !shouldShowVideoPagination && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={handleVideoLoadMore}
                      className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      <span>Load More</span>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {/* Pagination Controls for Videos */}
                {shouldShowVideoPagination && totalVideoPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Button
                      onClick={() =>
                        handleVideoPageChange(currentVideoPage - 1)
                      }
                      disabled={currentVideoPage === 1}
                      className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>
                    <div className="text-gray-400 text-sm">
                      Page {currentVideoPage} of {totalVideoPages}
                    </div>
                    <Button
                      onClick={() =>
                        handleVideoPageChange(currentVideoPage + 1)
                      }
                      disabled={currentVideoPage === totalVideoPages}
                      className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Button
        onClick={scrollToTop}
        className="back-to-top-btn fixed bottom-4 right-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 p-0 flex items-center justify-center rounded-lg animate-float transition-all duration-300 group"
      >
        <ArrowUp className="w-5 h-5 md:w-7 md:h-7 animate-icon-bounce group-hover:animate-none transition-transform duration-300" />
      </Button>
    </div>
  );
};

export default PortfolioContent;

