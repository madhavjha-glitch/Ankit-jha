import React, { useState, useEffect } from 'react';
import { Project, PROJECTS } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CaseStudies } from './components/CaseStudies';
import { HardwareLab } from './components/HardwareLab';
import { SkillsSection } from './components/SkillsSection';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { IntroSplash } from './components/IntroSplash';

export default function App() {
  // Intro splash screen on open
  const [showIntro, setShowIntro] = useState(true);

  // Dark mode initialization
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // default dark for high-tech aesthetic
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenSimulatorForProject = (project: Project) => {
    // Scroll smoothly to hardware lab
    const labEl = document.querySelector('#hardware-lab');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#060913] dark:text-slate-100 transition-colors duration-200">
      {/* Intro Welcome Screen on Open */}
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}

      {/* Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Top Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setResumeModalOpen(true)}
          onExploreProjects={() => {
            const el = document.querySelector('#case-studies');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenLab={() => {
            const el = document.querySelector('#hardware-lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 01. Case Studies Section */}
        <CaseStudies
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenSimulatorForProject={handleOpenSimulatorForProject}
        />

        {/* 02. Interactive Hardware Testbench Section */}
        <HardwareLab />

        {/* 03. Technical Capabilities & Systems */}
        <SkillsSection />

        {/* 04. Education & Certifications */}
        <EducationCertifications />

        {/* 05. Working Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable / Interactive Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
