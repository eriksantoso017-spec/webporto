"use client";

import { useEffect, useRef } from "react";
import { contacts } from "@/data/portfolioConstants";

// Generate random star positions
const generateStarShadows = (count) => {
  let shadows = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows += `${x}px ${y}px #a855f7`; // Purple color (#a855f7)
    if (i < count - 1) shadows += ", ";
  }
  return shadows;
};

const ContactContent = () => {
  const starsRef = useRef(null);
  const stars2Ref = useRef(null);
  const stars3Ref = useRef(null);
  const starsAfterRef = useRef(null);
  const stars2AfterRef = useRef(null);
  const stars3AfterRef = useRef(null);

  useEffect(() => {
    // Generate star shadows for each layer
    if (starsRef.current) {
      const shadows = generateStarShadows(700);
      starsRef.current.style.boxShadow = shadows;
    }

    if (starsAfterRef.current) {
      const shadows = generateStarShadows(700);
      starsAfterRef.current.style.boxShadow = shadows;
    }

    if (stars2Ref.current) {
      const shadows = generateStarShadows(200);
      stars2Ref.current.style.boxShadow = shadows;
    }

    if (stars2AfterRef.current) {
      const shadows = generateStarShadows(200);
      stars2AfterRef.current.style.boxShadow = shadows;
    }

    if (stars3Ref.current) {
      const shadows = generateStarShadows(100);
      stars3Ref.current.style.boxShadow = shadows;
    }

    if (stars3AfterRef.current) {
      const shadows = generateStarShadows(100);
      stars3AfterRef.current.style.boxShadow = shadows;
    }
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black flex items-center justify-center relative overflow-hidden contact-stars">
      {/* Stars Background */}
      <div id="stars" ref={starsRef}></div>
      <div className="stars-after" ref={starsAfterRef}></div>
      <div id="stars2" ref={stars2Ref}></div>
      <div className="stars2-after" ref={stars2AfterRef}></div>
      <div id="stars3" ref={stars3Ref}></div>
      <div className="stars3-after" ref={stars3AfterRef}></div>
      
      <div className="max-w-4xl w-full relative z-10">
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
                className="flex flex-col items-center justify-center space-y-3 group transition-transform duration-300 hover:scale-110"
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
};

export default ContactContent;

