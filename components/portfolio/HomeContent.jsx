"use client";

import { Button } from "@/components/ui/Components";

const HomeContent = ({ onNavigateToPortfolio, onNavigateToContact }) => {
  return (
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
            onClick={onNavigateToPortfolio}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            View My Work
          </Button>
          <Button
            onClick={onNavigateToContact}
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
};

export default HomeContent;

