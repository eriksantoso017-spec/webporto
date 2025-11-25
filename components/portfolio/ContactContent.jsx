"use client";

import { contacts } from "@/data/portfolioConstants";
import { useEffect, useRef } from "react";

// Generate random box-shadow for stars - optimized for performance
const generateStarShadows = (count) => {
  let shadows = [];
  // Use viewport dimensions or fallback to 2000x2000
  const width = typeof window !== 'undefined' ? window.innerWidth : 2000;
  const height = typeof window !== 'undefined' ? window.innerHeight : 2000;
  
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    shadows.push(`${x}px ${y}px 0 0 #a855f7`); // Purple color with no blur
  }
  return shadows.join(', ');
};

const ContactContent = () => {
  const starsRef = useRef(null);
  const stars2Ref = useRef(null);
  const stars3Ref = useRef(null);

  useEffect(() => {
    // Generate and set box-shadow for stars - use fewer stars for better performance
    if (starsRef.current) {
      const smallShadows = generateStarShadows(300);
      starsRef.current.style.boxShadow = smallShadows;
    }
    if (stars2Ref.current) {
      const mediumShadows = generateStarShadows(100);
      stars2Ref.current.style.boxShadow = mediumShadows;
    }
    if (stars3Ref.current) {
      const bigShadows = generateStarShadows(50);
      stars3Ref.current.style.boxShadow = bigShadows;
    }
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black flex items-center justify-center relative overflow-hidden contact-stars-background">
      {/* Stars Animation Background */}
      <div ref={starsRef} id="stars" className="contact-stars"></div>
      <div ref={stars2Ref} id="stars2" className="contact-stars2"></div>
      <div ref={stars3Ref} id="stars3" className="contact-stars3"></div>
      
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
                className="transition-transform duration-300 flex flex-col items-center justify-center space-y-3 group contact-link"
              >
                <Icon className="w-12 h-12 text-white group-hover:animate-bounce group-hover:scale-110 transition-transform duration-300" />
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

