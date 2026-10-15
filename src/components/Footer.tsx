import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060913] text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              {PERSONAL_INFO.name}
            </div>
            <p className="text-slate-500">
              © {new Date().getFullYear()} Ankit Kumar Jha. Electronics & Computer Science Engineering.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
            <a href="#case-studies" className="hover:text-slate-900 dark:hover:text-white transition-colors">Case Studies</a>
            <a href="#hardware-lab" className="hover:text-slate-900 dark:hover:text-white transition-colors">Hardware Lab</a>
            <a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">Skills</a>
            <button 
              onClick={onOpenResume} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Resume
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
