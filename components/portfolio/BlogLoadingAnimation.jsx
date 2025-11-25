"use client";

const BlogLoadingAnimation = () => {
  return (
    <div className="min-h-screen p-8 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          {/* Box on Hill Animation */}
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
          Preparing your reading experience
        </p>
      </div>
    </div>
  );
};

export default BlogLoadingAnimation;

