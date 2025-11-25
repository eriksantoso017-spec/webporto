"use client";

import { useEffect, useState } from "react";
import { contacts } from "@/data/portfolioConstants";

// Generate random box-shadow for stars
const generateStarShadows = (count) => {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #a855f7`); // Purple color
  }
  return shadows.join(", ");
};

const ContactContent = () => {
  const [starShadows, setStarShadows] = useState({
    stars1: "",
    stars2: "",
    stars3: "",
  });

  useEffect(() => {
    // Generate stars on mount
    setStarShadows({
      stars1: generateStarShadows(700),
      stars2: generateStarShadows(200),
      stars3: generateStarShadows(100),
    });
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black contact-stars-background relative overflow-hidden">
      {/* Stars Background */}
      <div
        id="contact-stars"
        className="contact-stars-layer contact-stars-small"
        style={{ boxShadow: starShadows.stars1 }}
      >
        <div
          className="contact-stars-after"
          style={{ boxShadow: starShadows.stars1 }}
        ></div>
      </div>
      <div
        id="contact-stars2"
        className="contact-stars-layer contact-stars-medium"
        style={{ boxShadow: starShadows.stars2 }}
      >
        <div
          className="contact-stars-after"
          style={{ boxShadow: starShadows.stars2 }}
        ></div>
      </div>
      <div
        id="contact-stars3"
        className="contact-stars-layer contact-stars-big"
        style={{ boxShadow: starShadows.stars3 }}
      >
        <div
          className="contact-stars-after"
          style={{ boxShadow: starShadows.stars3 }}
        ></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
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

