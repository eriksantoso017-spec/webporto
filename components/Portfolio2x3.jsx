"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useIsMobileDevice } from "@/hooks/useDeviceType";
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
  Facebook,
} from "lucide-react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Components";
import { imageProjects, videoProjects } from "@/data/portfolioData";
import dynamic from "next/dynamic";

// Constants
const ITEMS_PER_PAGE = 12;
const INITIAL_ITEMS = 12;
const MAX_LOAD_MORE = 2;
const SCROLL_MINIMIZE_THRESHOLD = 200;
const BLOG_LOADING_DELAY = 500;

const cubeData = [
  {
    id: "home",
    title: ".home {",
    subtitle: "welcome: get-to-know-me;",
    preview: "}",
  },
  {
    id: "skills",
    title: ".skills {",
    subtitle: "what-i-do: my-technical-expertise;",
    preview: "}",
  },
  {
    id: "portfolio",
    title: ".portfolio {",
    subtitle: "my-work: projects-i-have-built;",
    preview: "}",
  },
  {
    id: "education",
    title: ".education {",
    subtitle: "learning-journey: academic-background;",
    preview: "}",
  },
  {
    id: "contact",
    title: ".contact {",
    subtitle: "get-in-touch: let-us-connect;",
    preview: "}",
  },
  {
    id: "blog",
    title: ".blog {",
    subtitle: "random-thinking: thoughts-&-ideas;",
    preview: "}",
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
  { name: "Communication", icon: "/icons/icon-skills/communication.svg" },
  {
    name: "Problem Solving",
    icon: "/icons/icon-skills/problem-solving-skills.svg",
  },
  { name: "Team Work", icon: "/icons/icon-skills/teamwork.svg" },
  { name: "Diligent", icon: "/icons/icon-skills/diligence.svg" },
  { name: "Time Management", icon: "/icons/icon-skills/management-time.svg" },
  { name: "Creativity", icon: "/icons/icon-skills/creativity.svg" },
];

const education = [
  {
    id: 1,
    degree: "Jurusan IPS",
    institution: "MAN Sidoarjo",
    year: "2019-2022",
    icon: "/icons/mansda.svg",
    gradientClass: "from-green-500 to-yellow-400",
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

// Lazy load ImageLightbox
const ImageLightbox = dynamic(() => import("@/components/ImageLightbox"), {
  ssr: false,
  loading: () => null,
});

// Helper Functions
const usePagination = (items, loadMoreCount, currentPage) => {
  const totalItems = items.length;
  const itemsToShow = INITIAL_ITEMS + loadMoreCount * ITEMS_PER_PAGE;
  const shouldShowLoadMore =
    loadMoreCount < MAX_LOAD_MORE && itemsToShow < totalItems;
  const shouldShowPagination =
    loadMoreCount >= MAX_LOAD_MORE || itemsToShow >= 24;

  const displayedItems = shouldShowPagination
    ? items.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : items.slice(0, itemsToShow);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return {
    displayedItems,
    shouldShowLoadMore,
    shouldShowPagination,
    totalPages,
  };
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Helper function to get abbreviation (first letter + "..")
const getAbbreviation = (name) => {
  if (!name) return "";
  const firstLetter = name.charAt(0).toUpperCase();
  return `${firstLetter}..`;
};

// Reusable Components
const SkillCard = ({ skill, gradientFrom, gradientTo, className = "" }) => {
  // Get first letter for abbreviation
  const abbreviation = getAbbreviation(skill.name);

  // Generate skill class name for CSS targeting
  const skillClassName = skill.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`absolute -inset-[1px] bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg blur-sm opacity-40 group-hover:opacity-100 transition duration-500`}
      ></div>
      <div className="relative bg-black rounded-lg px-2 py-4 sm:px-3 sm:py-5 md:px-4 md:py-4 flex items-center gap-1.5 sm:gap-2 md:gap-3 border border-gray-800 transition-transform w-full min-h-[70px] sm:min-h-[80px] md:min-h-[90px] md:h-[90px]">
        <img
          src={skill.icon}
          alt={`${skill.name} icon`}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 flex-shrink-0 transition-all duration-300"
        />
        <span
          className={`text-white font-medium text-left flex-1 break-words text-xs sm:text-sm md:text-base skill-name-text skill-${skillClassName}`}
        >
          {/* Abbreviation for all skills at very small screens */}
          <span className="skill-abbreviation">{abbreviation}</span>

          {/* Photoshop: Photo- / shop (250-285px) */}
          {skill.name === "Photoshop" && (
            <span className="skill-photoshop-break-250-285">
              Photo-
              <br />
              shop
            </span>
          )}

          {/* Communication: Comm- / uni- / cation (250-274px) */}
          {skill.name === "Communication" && (
            <>
              <span className="skill-communication-break-250-274">
                Comm-
                <br />
                uni-
                <br />
                cation
              </span>
              <span className="skill-communication-break-275-360">
                Communi-
                <br />
                cation
              </span>
            </>
          )}

          {/* PowerPoint: Power- / Point (250-286px) */}
          {skill.name === "PowerPoint" && (
            <span className="skill-powerpoint-break-250-286">
              Power-
              <br />
              Point
            </span>
          )}

          {/* Time Management: Time / Management (340-470px) */}
          {skill.name === "Time Management" && (
            <>
              <span className="skill-timemanagement-break-340-470">
                Time
                <br />
                Management
              </span>
              <span className="skill-timemanagement-break-250-339">
                Time
                <br />
                Manage-
                <br />
                ment
              </span>
            </>
          )}

          {/* Premiere Pro: Premiere / Pro (250-320px) */}
          {skill.name === "Premiere Pro" && (
            <span className="skill-premiere-pro-break-250-320">
              Premiere
              <br />
              Pro
            </span>
          )}

          {/* Problem Solving: Problem / Solving (250-339px) */}
          {skill.name === "Problem Solving" && (
            <span className="skill-problem-solving-break-250-339">
              Problem
              <br />
              Solving
            </span>
          )}

          {/* Team Work: Team / Work (250-305px) */}
          {skill.name === "Team Work" && (
            <span className="skill-team-work-break-250-305">
              Team
              <br />
              Work
            </span>
          )}

          {/* Default for other skills */}
          {skill.name !== "Photoshop" &&
            skill.name !== "Communication" &&
            skill.name !== "PowerPoint" &&
            skill.name !== "Time Management" &&
            skill.name !== "Premiere Pro" &&
            skill.name !== "Problem Solving" &&
            skill.name !== "Team Work" && (
              <span className="skill-default-line-break">{skill.name}</span>
            )}

          {/* Full text for all skills */}
          <span className="skill-full-text">{skill.name}</span>
        </span>
      </div>
    </div>
  );
};

const BackToTopButton = () => (
  <Button
    onClick={scrollToTop}
    className="back-to-top-btn fixed bottom-4 right-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 p-0 flex items-center justify-center rounded-lg animate-float transition-all duration-300 group"
  >
    <ArrowUp className="w-5 h-5 md:w-7 md:h-7 animate-icon-bounce group-hover:animate-none transition-transform duration-300" />
  </Button>
);

const LoadMoreButton = ({ onClick }) => (
  <div className="mt-8 flex justify-center">
    <Button
      onClick={onClick}
      className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
    >
      <span>Load More</span>
      <ArrowDown className="w-4 h-4" />
    </Button>
  </div>
);

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>
      <div className="text-gray-400 text-sm">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

const VideoCard = ({ project }) => (
  <div className="relative group self-start">
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
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
    </div>
  </div>
);

const GlowCard = ({ children, gradientClass, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div
      className={`absolute -inset-0.5 bg-gradient-to-r ${gradientClass} rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500`}
    ></div>
    <div className="relative bg-black rounded-xl p-6 space-y-3 border border-gray-800">
      {children}
    </div>
  </div>
);

const CubeCard = ({ item, onClick }) => {
  const parseSubtitle = (subtitle) => {
    const colonIndex = subtitle.indexOf(":");
    if (colonIndex === -1) {
      return <span className="text-[#ce9178]">{subtitle}</span>;
    }

    const beforeColon = subtitle.substring(0, colonIndex);
    const afterColon = subtitle.substring(colonIndex + 1);
    const semicolonIndex = afterColon.indexOf(";");
    const afterColonText =
      semicolonIndex !== -1
        ? afterColon.substring(0, semicolonIndex)
        : afterColon;
    const hasSemicolon = semicolonIndex !== -1;

    return (
      <>
        <span className="text-[#569cd6]">{beforeColon}</span>
        <span className="text-white">:</span>
        <span className="text-[#c084fc]">{afterColonText}</span>
        {hasSemicolon && <span className="text-white">;</span>}
      </>
    );
  };

  return (
    <div
      key={item.id}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
      <div className="relative bg-black rounded-lg p-8 h-64 flex flex-col border border-gray-800 group-hover:border-transparent transition-all font-jetbrains-mono overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex flex-col justify-center items-start text-left space-y-3 mt-8">
          <h2 className="text-2xl font-semibold text-[#dfa73a]">
            {item.title}
          </h2>
          <p className="text-lg" style={{ marginLeft: "13px" }}>
            {parseSubtitle(item.subtitle)}
          </p>
          <p className="text-base text-[#dfa73a]">{item.preview}</p>
        </div>
        <div className="absolute bottom-4 right-4 text-gray-500 group-hover:text-purple-500 transition-colors">
          <ExternalLink className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// ImageProjectCard Component
const ImageProjectCard = ({ project, index = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const isMobileDevice = useIsMobileDevice();

  const prevImageWithBounds = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => {
      const newIndex = Math.max(0, prev - 1);
      setIsImageLoading(true);
      setImageOpacity(0);
      return newIndex;
    });
  };

  const nextImageWithBounds = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => {
      const newIndex = Math.min(project.images.length - 1, prev + 1);
      setIsImageLoading(true);
      setImageOpacity(0);
      return newIndex;
    });
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    // Slowly reveal image with fade-in animation
    setTimeout(() => {
      setImageOpacity(1);
    }, 50);
  };

  const handleImageLoadStart = () => {
    setIsImageLoading(true);
    setImageOpacity(0);
  };

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Initialize image opacity on mount
  useEffect(() => {
    // Preload first image
    const img = new Image();
    img.src = project.images[0];
    img.onload = () => {
      setIsImageLoading(false);
      setImageOpacity(1);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(card);

    const handleScroll = () => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardTop = rect.top;
      const cardHeight = rect.height;

      if (cardTop < windowHeight && cardTop > -cardHeight) {
        const scrollProgress =
          (windowHeight - cardTop) / (windowHeight + cardHeight);
        const offset = (scrollProgress - 0.5) * 15;
        setParallaxOffset(offset);
      }
    };

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
        handleScroll();

        return () => window.removeEventListener("scroll", onScroll);
      }
      return null;
    };

    let cleanupScroll = checkMobileAndSetup();
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (cleanupScroll) cleanupScroll();
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
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
        <div
          className="relative bg-black rounded-xl overflow-hidden border border-gray-800 w-full h-full cursor-pointer"
          onClick={() => handleImageClick(currentIndex)}
        >
          <div className="relative w-full h-full">
            <img
              src={project.images[currentIndex]}
              alt={`${project.title} - slide ${currentIndex + 1}`}
              className="w-full h-full object-cover hover:opacity-90 pointer-events-none"
              onLoad={handleImageLoad}
              onLoadStart={handleImageLoadStart}
              style={{
                opacity: imageOpacity,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
            {/* Loading placeholder */}
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-900 animate-pulse" />
            )}
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
              {project.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-[6.16px] h-[6.16px] rounded-full ${
                    currentIndex === idx ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ImageLightbox
        images={project.images}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </>
  );
};

// Main Component
const Portfolio2x3 = () => {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("images");
  const [currentImagePage, setCurrentImagePage] = useState(1);
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [imageLoadMoreCount, setImageLoadMoreCount] = useState(0);
  const [videoLoadMoreCount, setVideoLoadMoreCount] = useState(0);
  const [isButtonsMinimized, setIsButtonsMinimized] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const isMobileDevice = useIsMobileDevice();
  const portfolioTitleRef = useRef(null);

  // Pagination hooks
  const imagePagination = usePagination(
    imageProjects,
    imageLoadMoreCount,
    currentImagePage
  );
  const videoPagination = usePagination(
    videoProjects,
    videoLoadMoreCount,
    currentVideoPage
  );

  // Viewport width tracking
  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth, { passive: true });
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  // Reset pagination on tab change
  useEffect(() => {
    setCurrentImagePage(1);
    setCurrentVideoPage(1);
    setImageLoadMoreCount(0);
    setVideoLoadMoreCount(0);
  }, [activeTab]);

  // Button minimize on scroll
  useEffect(() => {
    if (expandedSection !== "portfolio") {
      setIsButtonsMinimized(false);
      return;
    }

    const handleScroll = () => {
      if (isMobileDevice) {
        setIsButtonsMinimized(false);
        return;
      }
      setIsButtonsMinimized(window.scrollY > SCROLL_MINIMIZE_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [expandedSection, isMobileDevice]);

  // Blog navigation
  useEffect(() => {
    if (expandedSection === "blog") {
      const timer = setTimeout(() => {
        router.push("/blog");
        setTimeout(() => {
          setExpandedSection(null);
        }, 200);
      }, BLOG_LOADING_DELAY);
      return () => clearTimeout(timer);
    }
  }, [expandedSection, router]);

  // Scroll to portfolio title on mobile
  useEffect(() => {
    if (
      expandedSection === "portfolio" &&
      isMobileDevice &&
      portfolioTitleRef.current
    ) {
      setTimeout(() => {
        portfolioTitleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [expandedSection, isMobileDevice]);

  // Handlers
  const handleImageLoadMore = () => setImageLoadMoreCount((prev) => prev + 1);
  const handleVideoLoadMore = () => setVideoLoadMoreCount((prev) => prev + 1);
  const handleImagePageChange = (newPage) => {
    setCurrentImagePage(newPage);
    scrollToTop();
  };
  const handleVideoPageChange = (newPage) => {
    setCurrentVideoPage(newPage);
    scrollToTop();
  };

  const isMinimized = isButtonsMinimized && expandedSection === "portfolio";
  const buttonMinimizedClass = isMinimized ? "md:w-10 md:h-10 md:px-0" : "";
  const textHiddenClass = isMinimized ? "md:hidden" : "";

  // Content Renderers
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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          My Skills
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills - Left Column */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {technicalSkills.map((skill, idx) => (
                <SkillCard
                  key={idx}
                  skill={skill}
                  gradientFrom="from-blue-600"
                  gradientTo="to-cyan-600"
                />
              ))}
            </div>
          </div>
          {/* Soft Skills - Right Column */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-green-400 mb-6">
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((skill, idx) => (
                <SkillCard
                  key={idx}
                  skill={skill}
                  gradientFrom="from-green-600"
                  gradientTo="to-emerald-600"
                  className="soft-skill-card"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioContent = () => (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={portfolioTitleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
        >
          My <span className="text-purple-500">Portfolio</span>
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
              {imagePagination.displayedItems.map((project, idx) => (
                <ImageProjectCard
                  key={`${project.id}-${viewportWidth}`}
                  project={project}
                  index={idx}
                />
              ))}
            </div>
            {imagePagination.shouldShowLoadMore &&
              !imagePagination.shouldShowPagination && (
                <LoadMoreButton onClick={handleImageLoadMore} />
              )}
            {imagePagination.shouldShowPagination && (
              <PaginationControls
                currentPage={currentImagePage}
                totalPages={imagePagination.totalPages}
                onPageChange={handleImagePageChange}
              />
            )}
          </TabsContent>
          <TabsContent value="videos" className="space-y-6">
            {activeTab === "videos" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {videoPagination.displayedItems.map((project) => (
                    <VideoCard key={project.id} project={project} />
                  ))}
                </div>
                {videoPagination.shouldShowLoadMore &&
                  !videoPagination.shouldShowPagination && (
                    <LoadMoreButton onClick={handleVideoLoadMore} />
                  )}
                {videoPagination.shouldShowPagination && (
                  <PaginationControls
                    currentPage={currentVideoPage}
                    totalPages={videoPagination.totalPages}
                    onPageChange={handleVideoPageChange}
                  />
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <BackToTopButton />
    </div>
  );

  const renderEducationContent = () => (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Education & <span className="text-purple-500">Experience</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <GlowCard key={edu.id} gradientClass={edu.gradientClass}>
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
                </GlowCard>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6">
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <GlowCard key={exp.id} gradientClass={exp.gradientClass}>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.year}</p>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </div>
  );

  const renderContactContent = () => (
    <div className="min-h-screen p-8 bg-black flex items-center justify-center contact-stars-background relative overflow-hidden">
      <div id="contact-stars"></div>
      <div id="contact-stars2"></div>
      <div id="contact-stars3"></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Get In <span className="text-purple-500">Touch</span>
        </h2>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Feel free to reach out through any of these platforms.
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
                className={`${contact.color} p-6 rounded-xl transition-transform duration-300 flex flex-col items-center justify-center space-y-3 group`}
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

  const renderBlogLoading = () => (
    <div className="min-h-screen p-8 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div id="blog-loader" className="mx-auto">
            <div id="blog-box"></div>
            <div id="blog-hill"></div>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-jetbrains-mono animate-pulse">
          <span className="text-purple-400">Loading</span>{" "}
          <span className="text-white">Blog</span>
          <span className="inline-block animate-bounce">.</span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Boxsyphus climbing the hill...
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    const contentMap = {
      home: renderHomeContent,
      skills: renderSkillsContent,
      portfolio: renderPortfolioContent,
      education: renderEducationContent,
      contact: renderContactContent,
      blog: renderBlogLoading,
    };
    return contentMap[expandedSection]?.() || null;
  };

  return (
    <div className="min-h-screen bg-black">
      {!expandedSection ? (
        <div className="min-h-screen p-8">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-[2.16rem] md:text-[3.375rem] font-semibold mb-4 font-jetbrains-mono flex flex-col md:flex-row md:justify-center md:items-center md:gap-2 landing-page-title">
              {/* Full version: ≥260px */}
              <span className="landing-title-full">
                <span className="text-purple-400">import</span>
                <span className="text-[#D4D4D4]">{" { myPortfolio }"}</span>
              </span>
              {/* Break version: 190-259px */}
              <span className="landing-title-break">
                <span className="text-purple-400">import</span>
                <span className="text-[#D4D4D4]">
                  {" {"}
                  <br />
                  myPort-
                  <br />
                  folio
                  <br />
                  {" }"}
                </span>
              </span>
              {/* Abbreviation version: ≤189px */}
              <span className="landing-title-abbr">
                <span className="text-purple-400">import</span>
                <span className="text-[#D4D4D4]">{" {"}</span>
                <span className="text-[#D4D4D4]"> my...</span>
                <span className="text-[#D4D4D4]">{" }"}</span>
              </span>
            </h1>
            <p className="text-xl text-gray-300 landing-subtitle">
              {/* Full version: ≥141px */}
              <span className="landing-subtitle-full">
                I hate being responsible-Ekko
              </span>
              {/* Break version: 100-140px */}
              <span className="landing-subtitle-break-100-140">
                I hate being respon-
                <br />
                sible-
                <br />
                Ekko
              </span>
              {/* Break version: 90-99px */}
              <span className="landing-subtitle-break-90-99">
                I
                <br />
                hate
                <br />
                being
                <br />
                res-
                <br />
                pon-
                <br />
                sible-
                <br />
                Ekko
              </span>
              {/* Abbreviation version: ≤89px */}
              <span className="landing-subtitle-abbr">
                I..
                <br />
                h..
                <br />
                b..
                <br />
                r..
                <br />
                -..
                <br />
                E..
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {cubeData.map((item) => (
              <CubeCard
                key={item.id}
                item={item}
                onClick={() => setExpandedSection(item.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <Button
            onClick={() => setExpandedSection(null)}
            className={`close-btn fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow transition-all duration-300 group ${buttonMinimizedClass}`}
          >
            <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
            <span
              className={`hidden md:inline transition-opacity duration-300 ${textHiddenClass}`}
            >
              Close
            </span>
          </Button>
          {(expandedSection === "portfolio" ||
            expandedSection === "contact") && (
            <Button
              onClick={() => setExpandedSection("home")}
              className={`back-to-home-btn fixed top-4 right-4 z-50 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 text-purple-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow transition-all duration-300 group ${buttonMinimizedClass}`}
            >
              <ArrowLeft className="w-6 h-6 md:w-4 md:h-4 md:mr-1.5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span
                className={`hidden md:inline transition-opacity duration-300 ${textHiddenClass}`}
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
