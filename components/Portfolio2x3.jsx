"use client";

import { useState, useEffect } from "react";
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

import { imageProjects } from "@/data/portfolioData";

// --- Komponen Kartu Galeri Gambar ---
const ImageProjectCard = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImageWithBounds = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextImageWithBounds = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.min(project.images.length - 1, prev + 1));
  };

  return (
    // [MODIFIKASI] Menggunakan struktur "glowing border"
    <div className="relative group">
      {/* RGB Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>

      {/* Card Content */}
      <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
        <div className="p-0">
          <div className="relative w-full h-48">
            <img
              src={project.images[currentIndex]}
              alt={`${project.title} - slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-1/2 left-2 right-2 flex justify-between transform -translate-y-1/2">
              <Button
                size="icon"
                variant="ghost"
                onClick={prevImageWithBounds}
                disabled={currentIndex === 0}
                className="swipe-btn-left !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0"
              >
                <ArrowLeft className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={nextImageWithBounds}
                disabled={currentIndex === project.images.length - 1}
                className="swipe-btn-right !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 disabled:opacity-30 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0"
              >
                <ArrowRight className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
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

          <div className="p-6 space-y-2">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-300">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio2x3 = () => {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("images");

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

  const videoProjects = [
    {
      id: 1,
      title: "Talkshow Dasar Broadcasting",
      description:
        "Sebuah video yang berisikan talkshow dengan tema parenting untuk memenuhi tugas mata kuliah dasar broadcasting.",
      youtubeId: "HMtgzU1EkbQ",
    },
    {
      id: 2,
      title: "Dokumenter Pendidikan",
      description:
        "Pada saat semester 1, saya diberikan tugas untuk membuat sebuah video dokumenter terhadap bagaimana kondisi pendidikan di Indonesia, dan inilah hasilnya.",
      youtubeId: "jIrPHhzGXac",
    },
    {
      id: 3,
      title: "After Movie MCR",
      description:
        "Sebuah video yang berisikan tentang bagaimana perjalanan saya beserta teman-teman saat menjalin partnership dengan partai Golkar Kota Malang.",
      youtubeId: "-A4oyI8pO4g",
    },
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
      title: "Content Creator",
      company: "Freelance",
      year: "2023-Now",
      description:
        "Membuat konten kreatif untuk berbagai platform media sosial",
      gradientClass: "from-purple-600 to-pink-600",
    },
    {
      id: 2,
      title: "Video Editor",
      company: "Independent Project",
      year: "2022-Now",
      description:
        "Mengedit video untuk berbagai kebutuhan proyek dan dokumentasi",
      gradientClass: "from-blue-600 to-cyan-600",
    },
    {
      id: 3,
      title: "Social Media Manager",
      company: "Digital Agency",
      year: "2023-Now",
      description:
        "Mengelola dan mengoptimalkan strategi media sosial untuk berbagai brand",
      gradientClass: "from-green-600 to-emerald-600",
    },
    {
      id: 4,
      title: "Web Developer",
      company: "Freelance Project",
      year: "2022-Now",
      description:
        "Membangun website responsif dan modern dengan teknologi terdepan",
      gradientClass: "from-orange-600 to-red-600",
    },
    {
      id: 5,
      title: "Graphic Designer",
      company: "Creative Studio",
      year: "2023-Now",
      description:
        "Mendesain visual branding dan materi promosi untuk berbagai klien",
      gradientClass: "from-indigo-600 to-blue-600",
    },
    {
      id: 6,
      title: "Photography",
      company: "Independent Work",
      year: "2021-Now",
      description:
        "Melakukan sesi foto profesional untuk event, portrait, dan dokumentasi",
      gradientClass: "from-yellow-600 to-orange-600",
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
          Part time designer and video editor. Full time Gamer. Enjoy learning
          new things. Passionate about technology, editing, design, cyber
          security, OSINT and finance.
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
    <div className="min-h-screen p-8 bg-black">
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
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imageProjects.map((project) => (
                <ImageProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoProjects.map((project) => (
                <div key={project.id} className="relative group">
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
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
              Cogito Ergo Sum-Rene Descartes
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
            className="close-btn fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-2 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 group"
          >
            <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden md:inline">Close</span>
          </Button>
          {(expandedSection === "portfolio" ||
            expandedSection === "contact") && (
            <Button
              onClick={() => setExpandedSection("home")}
              className="back-to-home-btn fixed top-4 right-4 z-50 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 text-purple-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center animate-pulse-slow hover:scale-110 md:hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group"
            >
              <ArrowLeft className="w-6 h-6 md:w-4 md:h-4 md:mr-1.5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden md:inline">Back to Home</span>
            </Button>
          )}
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default Portfolio2x3;
