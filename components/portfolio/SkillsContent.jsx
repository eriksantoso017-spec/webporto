"use client";

import { technicalSkills, softSkills } from "@/data/portfolioConstants";

const SkillsContent = () => {
  return (
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
              {technicalSkills.map((skill, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-black rounded-lg p-6 flex flex-col items-center text-center space-y-3 border border-gray-800 transition-transform">
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
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-green-400 mb-6">
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                <div key={index} className="relative group soft-skill-card">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500 soft-skill-glow"></div>
                  <div className="relative bg-black rounded-lg p-6 flex flex-col items-center text-center space-y-3 border border-gray-800 transition-transform">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsContent;

