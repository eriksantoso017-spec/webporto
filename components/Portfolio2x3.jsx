"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsMobileDevice } from "@/hooks/useDeviceType";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Components";
import { cubeData } from "@/data/portfolioConstants";
import CubeCard from "@/components/portfolio/CubeCard";
import HomeContent from "@/components/portfolio/HomeContent";
import SkillsContent from "@/components/portfolio/SkillsContent";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import EducationContent from "@/components/portfolio/EducationContent";
import ContactContent from "@/components/portfolio/ContactContent";
import BlogLoadingAnimation from "@/components/portfolio/BlogLoadingAnimation";

const Portfolio2x3 = () => {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);
  const [isButtonsMinimized, setIsButtonsMinimized] = useState(false);
  const isMobileDevice = useIsMobileDevice();

  // Handle button minimize on scroll for desktop
  useEffect(() => {
    if (expandedSection !== "portfolio") {
      setIsButtonsMinimized(false);
      return;
    }

    const handleScroll = () => {
      // Only apply on desktop
      if (isMobileDevice) {
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
  }, [expandedSection, isMobileDevice]);

  // Redirect to blog page when blog section is clicked
  useEffect(() => {
    if (expandedSection === "blog") {
      // Small delay to show loading animation before navigation
      const timer = setTimeout(() => {
        router.push("/blog");
        // Reset section after navigation
        setTimeout(() => {
          setExpandedSection(null);
        }, 200);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [expandedSection, router]);

  const renderContent = () => {
    switch (expandedSection) {
      case "home":
        return (
          <HomeContent
            onNavigateToPortfolio={() => setExpandedSection("portfolio")}
            onNavigateToContact={() => setExpandedSection("contact")}
          />
        );
      case "skills":
        return <SkillsContent />;
      case "portfolio":
        return <PortfolioContent />;
      case "education":
        return <EducationContent />;
      case "contact":
        return <ContactContent />;
      case "blog":
        return <BlogLoadingAnimation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {!expandedSection ? (
        <div className="min-h-screen p-8">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-[2.16rem] md:text-[3.375rem] font-semibold mb-4 font-jetbrains-mono flex flex-col md:flex-row md:justify-center md:items-center md:gap-2">
              <span className="text-purple-400">import</span>
              <span className="text-[#D4D4D4]">{"{ myPortfolio }"}</span>
            </h1>
            <p className="text-xl text-gray-300">
              I hate being responsible-Ekko
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
            className={`close-btn fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow transition-all duration-300 group ${
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
              className={`back-to-home-btn fixed top-4 right-4 z-50 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 text-purple-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow transition-all duration-300 group ${
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
