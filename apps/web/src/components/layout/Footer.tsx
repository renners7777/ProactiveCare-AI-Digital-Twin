import React from 'react';
import { Github, Linkedin, Globe, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chris-renshaw-renners7777/',
      icon: Linkedin
    },
    {
      name: 'GitHub',
      url: 'https://github.com/renners7777',
      icon: Github
    },
    {
      name: 'Website',
      url: 'https://www.chrisrenshaw.net/',
      icon: Globe
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/renners7777',
      icon: Twitter
    },
  ];

  return (
    <footer className="bg-white border-t border-neutral-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-neutral-600 flex items-center">
          © {new Date().getFullYear()} ProactiveCare AI. Built by Chris Renshaw using
          <a 
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center ml-2 text-neutral-600 hover:text-primary-600 transition-colors"
            aria-label="Built with Bolt"
          >
            <img 
              src="/black_circle_360x360.png" 
              alt="Bolt Logo" 
              className="w-5 h-5"
            />
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-600 transition-colors w-5 h-5 flex items-center justify-center"
              aria-label={`Visit Chris Renshaw's ${link.name}`}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;