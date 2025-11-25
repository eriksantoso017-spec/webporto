"use client";

import { useState, useEffect, useRef } from "react";
import { useIsMobileDevice } from "@/hooks/useDeviceType";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Components";
import dynamic from "next/dynamic";

// Lazy load ImageLightbox - hanya load saat diperlukan
const ImageLightbox = dynamic(() => import("@/components/ImageLightbox"), {
  ssr: false,
  loading: () => null,
});

const ImageProjectCard = ({ project, index = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const isMobileDevice = useIsMobileDevice();

  const prevImageWithBounds = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextImageWithBounds = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.min(project.images.length - 1, prev + 1));
  };

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Parallax and reveal animation effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Intersection Observer for reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(card);

    // Parallax scroll effect - lightweight
    const handleScroll = () => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardTop = rect.top;
      const cardHeight = rect.height;

      // Only apply parallax if card is visible
      if (cardTop < windowHeight && cardTop > -cardHeight) {
        const scrollProgress =
          (windowHeight - cardTop) / (windowHeight + cardHeight);
        const offset = (scrollProgress - 0.5) * 15; // Subtle parallax (15px max)
        setParallaxOffset(offset);
      }
    };

    // Check if mobile and handle resize
    const checkMobileAndSetup = () => {
      if (!isMobileDevice) {
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
      }
      return null;
    };

    // Initial setup
    let cleanupScroll = checkMobileAndSetup();

    // Handle resize to update parallax behavior
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Cleanup previous scroll listener
        if (cleanupScroll) cleanupScroll();
        // Re-setup based on current device type
        cleanupScroll = checkMobileAndSetup();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      if (cleanupScroll) cleanupScroll();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobileDevice]);

  return (
    <>
      <div
        ref={cardRef}
        className="relative group self-start portfolio-card-parallax"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? `translateY(${parallaxOffset}px)`
            : "translateY(30px)",
          transition: `opacity 0.6s ease-out ${
            index * 0.1
          }s, transform 0.3s ease-out`,
        }}
      >
        {/* RGB Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>

        {/* Card Content */}
        <div
          className="relative bg-black rounded-xl overflow-hidden border border-gray-800 w-full h-full cursor-pointer"
          onClick={() => handleImageClick(currentIndex)}
        >
          <div className="relative w-full h-full">
            <img
              src={project.images[currentIndex]}
              alt={`${project.title} - slide ${currentIndex + 1}`}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity pointer-events-none"
            />

            {/* Title - Only visible on hover, positioned at bottom left */}
            <div className="absolute bottom-[3px] left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-y-[3px]">
              <div className="px-4 pb-[57px] pt-6"></div>
            </div>
            <div className="absolute bottom-[3px] left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <h3 className="text-[0.875rem] font-bold text-white px-4 pb-3 pt-6 -ml-[5px]">
                {project.title}
              </h3>
            </div>

            <div className="absolute top-1/2 left-2 right-2 flex justify-between transform -translate-y-1/2 pointer-events-none">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImageWithBounds(e);
                }}
                disabled={currentIndex === 0}
                className="swipe-btn-left !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImageWithBounds(e);
                }}
                disabled={currentIndex === project.images.length - 1}
                className="swipe-btn-right !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-300" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 pointer-events-none">
              {project.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-[6.16px] h-[6.16px] rounded-full ${
                    currentIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={project.images}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </>
  );
};

export default ImageProjectCard;

