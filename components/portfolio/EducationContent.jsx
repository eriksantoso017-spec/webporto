"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/Components";
import { education, experiences } from "@/data/portfolioConstants";

const EducationContent = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
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
                    className={`absolute -inset-0.5 bg-gradient-to-r ${edu.gradientClass} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
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
        className="back-to-top-btn fixed bottom-4 right-4 z-50 bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-purple-500 w-10 h-10 p-0 flex items-center justify-center rounded-lg animate-float transition-all duration-300 group"
      >
        <ArrowUp className="w-5 h-5 md:w-7 md:h-7 animate-icon-bounce group-hover:animate-none transition-transform duration-300" />
      </Button>
    </div>
  );
};

export default EducationContent;

