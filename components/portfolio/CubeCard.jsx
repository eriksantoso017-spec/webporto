"use client";

import { ExternalLink } from "lucide-react";

const CubeCard = ({ item, onClick }) => {
  const renderSubtitle = () => {
    const colonIndex = item.subtitle.indexOf(":");
    if (colonIndex === -1) {
      return <span className="text-[#ce9178]">{item.subtitle}</span>;
    }
    const beforeColon = item.subtitle.substring(0, colonIndex);
    const afterColon = item.subtitle.substring(colonIndex + 1);
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
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
      <div className="relative bg-black rounded-lg p-8 h-64 flex flex-col border border-gray-800 group-hover:border-transparent transition-all font-jetbrains-mono overflow-hidden">
        {/* Window Controls - Three Circles */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center items-start text-left space-y-3 mt-8">
          <h2 className="text-2xl font-semibold text-[#dfa73a]">
            {item.title}
          </h2>
          <p className="text-lg" style={{ marginLeft: "13px" }}>
            {renderSubtitle()}
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

export default CubeCard;

