"use client";

import { contacts } from "@/data/portfolioConstants";

const ContactContent = () => {
  return (
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
                className={`${contact.color} p-6 rounded-xl transition-transform duration-300 flex flex-col items-center justify-center space-y-3 group`}
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

