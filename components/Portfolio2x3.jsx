"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
  X,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Users,
  Clock,
  Lightbulb,
  Target,
  Zap,
  Facebook,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Components";

import { imageProjects, videoProjects } from "@/data/portfolioData";

// --- Komponen Lightbox ---
const ImageLightbox = ({ images, isOpen, onClose, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex || 0);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        setScale(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    if (!isOpen) return;
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setScale((prev) => Math.min(Math.max(1, prev + delta), 4));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Calculate boundaries to prevent dragging outside viewport when zoomed
      if (scale > 1 && imgRef.current) {
        const imgElement = imgRef.current;
        const rect = imgElement.getBoundingClientRect();
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        // Calculate the actual scaled dimensions
        const scaledWidth = rect.width;
        const scaledHeight = rect.height;

        // Calculate max translation to keep image edges within viewport
        const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
        const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY)),
        });
      } else {
        // At scale 1, allow free movement for swipe detection
        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;

      // Calculate boundaries for touch as well when zoomed
      if (scale > 1 && imgRef.current) {
        const imgElement = imgRef.current;
        const rect = imgElement.getBoundingClientRect();
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const scaledWidth = rect.width;
        const scaledHeight = rect.height;

        const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
        const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY)),
        });
      } else {
        setPosition({ x: newX, y: newY });
      }
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance;
        setScale((prev) => Math.min(Math.max(1, prev * scaleChange), 4));
      }
      setLastTouchDistance(distance);
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      setLastTouchDistance(0);
    }
  };

  const swipeStartRef = useRef({ x: 0, y: 0 });

  const handleSwipe = (startX, endX) => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50 && scale === 1) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleTouchStartSwipe = (e) => {
    swipeStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEndSwipe = (e) => {
    const swipeStart = swipeStartRef.current;
    if (!swipeStart.x || !swipeStart.y) return;
    const swipeEndX = e.changedTouches[0].clientX;
    const swipeEndY = e.changedTouches[0].clientY;
    const diffX = swipeStart.x - swipeEndX;
    const diffY = swipeStart.y - swipeEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      handleSwipe(swipeStart.x, swipeEndX);
    }
    swipeStartRef.current = { x: 0, y: 0 };
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && scale === 1) {
          onClose();
        }
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Close Button */}
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center rounded-lg hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-red-500/50"
      >
        <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden md:inline">Close</span>
      </Button>

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          handleTouchStart(e);
          handleTouchStartSwipe(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={(e) => {
          handleTouchEnd(e);
          handleTouchEndSwipe(e);
        }}
        style={{
          cursor: isDragging ? "grabbing" : scale > 1 ? "move" : "grab",
        }}
      >
        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${
              position.y / scale
            }px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
          draggable={false}
        />
      </div>

      {/* Swipe Buttons */}
      {images.length > 1 && (
        <div className="absolute top-1/2 left-2 right-2 md:left-12 md:right-12 flex justify-between transform -translate-y-1/2 z-[10001] pointer-events-none">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            disabled={currentIndex === 0}
            className="lightbox-swipe-btn-left !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            disabled={currentIndex === images.length - 1}
            className="lightbox-swipe-btn-right !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
          >
            <ArrowRight className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
          </Button>
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg border border-gray-700">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Zoom Indicator */}
      {scale > 1 && (
        <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg border border-gray-700">
          {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  );
};

// --- Komponen Kartu Galeri Gambar ---
const ImageProjectCard = ({ project, index = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

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

    // Disable parallax on mobile for better performance
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
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
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* [MODIFIKASI] Menggunakan struktur "glowing border" */}
      <div
        ref={cardRef}
        className="relative group self-start w-full max-w-[380px] h-[306px] mx-auto md:w-[380px] portfolio-card-parallax"
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
            <div className="absolute bottom-[3px] left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
                className="swipe-btn-left !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
              >
                <ArrowLeft className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImageWithBounds(e);
                }}
                disabled={currentIndex === project.images.length - 1}
                className="swipe-btn-right !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
              >
                <ArrowRight className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 pointer-events-none">
              {project.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
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

const Portfolio2x3 = () => {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("images");
  const [currentImagePage, setCurrentImagePage] = useState(1);
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [imageLoadMoreCount, setImageLoadMoreCount] = useState(0);
  const [videoLoadMoreCount, setVideoLoadMoreCount] = useState(0);
  const [isButtonsMinimized, setIsButtonsMinimized] = useState(false);

  const itemsPerPage = 12;
  const initialItems = 12;
  const maxLoadMore = 2; // Load more maksimal 2 kali (24 card total)

  // Reset page and load more count when switching tabs
  useEffect(() => {
    setCurrentImagePage(1);
    setCurrentVideoPage(1);
    setImageLoadMoreCount(0);
    setVideoLoadMoreCount(0);
  }, [activeTab]);

  // Handle button minimize on scroll for desktop
  useEffect(() => {
    if (expandedSection !== "portfolio") {
      setIsButtonsMinimized(false);
      return;
    }

    const handleScroll = () => {
      // Only apply on desktop
      if (window.innerWidth < 768) {
        setIsButtonsMinimized(false);
        return;
      }

      const scrollY = window.scrollY;

      // Minimize buttons when scrolled past 200px (past header area)
      if (scrollY > 200) {
        setIsButtonsMinimized(true);
      } else {
        setIsButtonsMinimized(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [expandedSection]);

  // Redirect to blog page when blog section is clicked
  useEffect(() => {
    if (expandedSection === "blog") {
      router.push("/blog");
      setExpandedSection(null); // Reset to prevent re-render
    }
  }, [expandedSection, router]);

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

  const cubeData = [
    {
      id: "home",
      title: "Home",
      subtitle: "Welcome",
      preview: "Get to know me",
    },
    {
      id: "skills",
      title: "Skills",
      subtitle: "What I Do",
      preview: "My technical expertise",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      subtitle: "My Work",
      preview: "Projects I have built",
    },
    {
      id: "education",
      title: "Education",
      subtitle: "Learning Journey",
      preview: "Academic background",
    },
    {
      id: "contact",
      title: "Contact",
      subtitle: "Get In Touch",
      preview: "Let's connect",
    },
    {
      id: "blog",
      title: "Blog",
      subtitle: "Thoughts & Ideas",
      preview: "Random Thinking",
    },
  ];

  const technicalSkills = [
    { name: "Word", icon: "/icons/word.svg" },
    { name: "PowerPoint", icon: "/icons/powerpoint.svg" },
    { name: "Canva", icon: "/icons/canva.svg" },
    { name: "Photoshop", icon: "/icons/photoshop.svg" },
    { name: "Premiere Pro", icon: "/icons/premierepro.svg" },
  ];

  const softSkills = [
    { name: "Communication", icon: MessageSquare },
    { name: "Problem Solving", icon: Lightbulb },
    { name: "Team Work", icon: Users },
    { name: "Leadership", icon: Target },
    { name: "Time Management", icon: Clock },
    { name: "Creativity", icon: Zap },
  ];

  const education = [
    {
      id: 1,
      degree: "Jurusan IPS",
      institution: "MAN Sidoarjo",
      year: "2019-2022",
      icon: "/icons/mansda.svg",
      gradientClass: "from-green-300 to-yellow-400",
    },
    {
      id: 2,
      degree: "S-1 Ilmu Komunikasi",
      institution: "Universitas Brawijaya",
      year: "2022-Now",
      icon: "/icons/brawijaya.svg",
      gradientClass: "from-blue-700 to-amber-500",
    },
  ];

  const experiences = [
    {
      id: 1,
      title: "Designer",
      company: "Brawijaya English Tournament 2023",
      year: "2023",
      description:
        "Mengubah tema website BET 2023 dan mendesain beberapa konten instagram",
      gradientClass: "from-purple-600 to-pink-600",
    },
    // {
    //   id: 2,
    //   title: "Video Editor",
    //   company: "Independent Project",
    //   year: "2022-Now",
    //   description:
    //     "Mengedit video untuk berbagai kebutuhan proyek dan dokumentasi",
    //   gradientClass: "from-blue-600 to-cyan-600",
    // },
    // {
    //   id: 3,
    //   title: "Social Media Manager",
    //   company: "Digital Agency",
    //   year: "2023-Now",
    //   description:
    //     "Mengelola dan mengoptimalkan strategi media sosial untuk berbagai brand",
    //   gradientClass: "from-green-600 to-emerald-600",
    // },
    // {
    //   id: 4,
    //   title: "Web Developer",
    //   company: "Freelance Project",
    //   year: "2022-Now",
    //   description:
    //     "Membangun website responsif dan modern dengan teknologi terdepan",
    //   gradientClass: "from-orange-600 to-red-600",
    // },
    // {
    //   id: 5,
    //   title: "Graphic Designer",
    //   company: "Creative Studio",
    //   year: "2023-Now",
    //   description:
    //     "Mendesain visual branding dan materi promosi untuk berbagai klien",
    //   gradientClass: "from-indigo-600 to-blue-600",
    // },
    // {
    //   id: 6,
    //   title: "Photography",
    //   company: "Independent Work",
    //   year: "2021-Now",
    //   description:
    //     "Melakukan sesi foto profesional untuk event, portrait, dan dokumentasi",
    //   gradientClass: "from-yellow-600 to-orange-600",
    // },
  ];

  const contacts = [
    {
      name: "Email",
      icon: Mail,
      link: "mailto:ricksant853@gmail.com",
      color: "bg-red-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "https://www.linkedin.com/in/erik-santoso-89596324b/",
      color: "bg-blue-600",
    },
    {
      name: "GitHub",
      icon: Github,
      link: "https://github.com/eriksantoso17",
      color: "bg-gray-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "https://x.com/agenbuahkhuldi",
      color: "bg-sky-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "https://www.instagram.com/rickandsant/",
      color: "bg-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      link: "https://www.facebook.com/rickandsants/",
      color: "bg-blue-800",
    },
  ];

  const renderHomeContent = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black home-particles">
      <div className="text-center space-y-6 max-w-3xl home-content">
        <h1 className="text-5xl md:text-7xl font-bold text-white animate-pulse">
          Hello, I'm <span className="text-purple-500">Erik Santoso</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-white">
          Undergraduate Communication Student
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Part time designer and video editor. Full time Unemployer. Enjoy
          learning new things. Passionate about technology, editing, design,
          cyber security, OSINT and finance.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button
            onClick={() => setExpandedSection("portfolio")}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            View My Work
          </Button>
          <Button
            onClick={() => setExpandedSection("contact")}
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
          >
            Get In Touch
          </Button>

          <a
            href="/cvdungu.pdf"
            download
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 border border-gray-300 inline-flex items-center justify-center"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );

  const renderSkillsContent = () => (
    <div className="min-h-screen p-8 bg-black skills-tab-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          My Skills
        </h2>
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {technicalSkills.map((skill, index) => {
                return (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black rounded-lg p-6 flex flex-col items-center text-center space-y-3 border border-gray-800 group-hover:scale-105 transition-transform">
                      <img
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className="w-12 h-12"
                      />
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-green-400 mb-6">
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="relative group soft-skill-card">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500 soft-skill-glow"></div>
                    <div className="relative bg-black rounded-lg p-6 flex flex-col items-center text-center space-y-3 border border-gray-800 group-hover:scale-105 transition-transform">
                      <Icon className="w-12 h-12 text-green-400" />
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioContent = () => (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          My Portfolio
        </h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-transparent gap-4">
            <TabsTrigger
              value="images"
              className="text-gray-400 data-[state=active]:text-white pb-2 transition-all duration-300 bg-transparent border-b-2 border-transparent data-[state=active]:border-purple-500 hover:text-purple-400 hover:border-purple-400 hover:scale-105 cursor-pointer"
            >
              Image Gallery
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="text-gray-400 data-[state=active]:text-white pb-2 transition-all duration-300 bg-transparent border-b-2 border-transparent data-[state=active]:border-purple-500 hover:text-purple-400 hover:border-purple-400 hover:scale-105 cursor-pointer"
            >
              Video Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="images" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px] items-start mx-5 md:mx-5 justify-center">
              {displayedImageProjects.map((project, index) => (
                <ImageProjectCard
                  key={project.id}
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
                  onClick={() => handleVideoPageChange(currentVideoPage - 1)}
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
                  onClick={() => handleVideoPageChange(currentVideoPage + 1)}
                  disabled={currentVideoPage === totalVideoPages}
                  className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Button
        onClick={scrollToTop}
        className="back-to-top-btn fixed bottom-4 right-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 p-0 flex items-center justify-center rounded-lg animate-float hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-purple-500/50"
      >
        <ArrowUp className="w-5 h-5 animate-icon-bounce group-hover:animate-none group-hover:scale-125 transition-transform duration-300" />
      </Button>
    </div>
  );

  const renderEducationContent = () => (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Education & Experience
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${edu.gradientClass} rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500`}
                  ></div>
                  <div className="relative bg-black rounded-xl p-6 space-y-3 border border-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <img
                          src={edu.icon}
                          alt={`${edu.institution} logo`}
                          className="w-8 h-8 mt-1"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-blue-400 font-medium">
                            {edu.institution}
                          </p>
                          <p className="text-gray-400 text-sm">{edu.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6">
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${exp.gradientClass} rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500`}
                  ></div>
                  <div className="relative bg-black rounded-xl p-6 space-y-3 border border-gray-800">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-purple-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-400 text-sm">{exp.year}</p>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={scrollToTop}
        className="back-to-top-btn fixed bottom-4 right-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 p-0 flex items-center justify-center rounded-lg animate-float hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-purple-500/50"
      >
        <ArrowUp className="w-5 h-5 animate-icon-bounce group-hover:animate-none group-hover:scale-125 transition-transform duration-300" />
      </Button>
    </div>
  );

  const renderContactContent = () => (
    <div className="min-h-screen p-8 bg-black flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Let's connect! Feel free to reach out through any of these platforms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${contact.color} p-6 rounded-xl hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center space-y-3 group`}
              >
                <Icon className="w-12 h-12 text-white group-hover:animate-bounce" />
                <span className="text-white font-semibold">{contact.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (expandedSection) {
      case "home":
        return renderHomeContent();
      case "skills":
        return renderSkillsContent();
      case "portfolio":
        return renderPortfolioContent();
      case "education":
        return renderEducationContent();
      case "contact":
        return renderContactContent();
      case "blog":
        // Blog is handled by useEffect redirect, return null here
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {!expandedSection ? (
        <div className="min-h-screen p-8">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              My <span className="text-purple-500">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300">
              I hate being responsible-Ekko
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {cubeData.map((item) => (
              <div
                key={item.id}
                onClick={() => setExpandedSection(item.id)}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <div className="relative bg-black rounded-lg p-8 h-64 flex flex-col justify-center items-center text-center space-y-4 border border-gray-800 group-hover:border-transparent transition-all">
                  <h2 className="text-3xl font-bold text-white">
                    {item.title}
                  </h2>
                  <p className="text-xl text-purple-400">{item.subtitle}</p>
                  <p className="text-gray-400">{item.preview}</p>
                  <div className="absolute bottom-4 right-4 text-gray-500 group-hover:text-purple-500 transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <Button
            onClick={() => setExpandedSection(null)}
            className={`close-btn fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 group ${
              isButtonsMinimized && expandedSection === "portfolio"
                ? "md:w-10 md:h-10 md:px-0"
                : ""
            }`}
          >
            <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
            <span
              className={`hidden md:inline transition-opacity duration-300 ${
                isButtonsMinimized && expandedSection === "portfolio"
                  ? "md:hidden"
                  : ""
              }`}
            >
              Close
            </span>
          </Button>
          {(expandedSection === "portfolio" ||
            expandedSection === "contact") && (
            <Button
              onClick={() => setExpandedSection("home")}
              className={`back-to-home-btn fixed top-4 right-4 z-50 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 text-purple-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group ${
                isButtonsMinimized && expandedSection === "portfolio"
                  ? "md:w-10 md:h-10 md:px-0"
                  : ""
              }`}
            >
              <ArrowLeft className="w-6 h-6 md:w-4 md:h-4 md:mr-1.5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span
                className={`hidden md:inline transition-opacity duration-300 ${
                  isButtonsMinimized && expandedSection === "portfolio"
                    ? "md:hidden"
                    : ""
                }`}
              >
                Back to Home
              </span>
            </Button>
          )}
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default Portfolio2x3;
