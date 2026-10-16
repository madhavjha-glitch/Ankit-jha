import React, { useEffect, useState } from 'react';
import { Project } from '../data/portfolioData';
import { 
  X, 
  Cpu, 
  Layers, 
  Code2, 
  CheckCircle, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Sliders,
  Sparkles,
  Zap
} from 'lucide-react';
import { SosTrackerSimulator, SmartFeederSimulator, LineFollowerSimulator } from './Simulators';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'firmware' | 'simulator'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl my-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 shrink-0">
          <div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {project.categoryLabel}
              <span className="mx-2">·</span>
              <span>{project.period}</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5 line-clamp-1">
              {project.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 shrink-0 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Context', icon: Layers },
            { id: 'architecture', label: 'Hardware Architecture', icon: Cpu },
            { id: 'firmware', label: 'Firmware & Logic', icon: Code2 },
            { id: 'simulator', label: 'Live Testbench Simulation', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* TAB 1: OVERVIEW & CONTEXT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Image & Quick Metrics Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 h-64 sm:h-72 w-full relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/assets/images/')) {
                        target.src = `/assets/images/${project.id === 'child-safety-sos' ? 'project_child_safety_1792086649458.jpg' : project.id === 'smart-pet-feeder' ? 'project_smart_feeder_1792086649785.jpg' : 'project_line_follower_1792086649565.jpg'}`;
                      }
                    }}
                  />
                </div>
                <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 tracking-wide">
                      VERIFIED BENCHMARKS
                    </div>
                    <div className="space-y-3">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-2 last:border-0 last:pb-0">
                          <span className="text-xs text-slate-600 dark:text-slate-400">{m.label}</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white text-base tabular-nums">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
                    <div className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">Interactive Verification</div>
                    <p className="text-xs text-blue-800/80 dark:text-blue-200/80 mb-2">
                      Test the actual firmware state machine logic in real time in our interactive hardware testbench.
                    </p>
                    <button
                      onClick={() => setActiveTab('simulator')}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Switch to Live Testbench</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* The Challenge & The Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    The Engineering Challenge
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                    {project.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Hardware-Software Solution
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Results */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Demonstrated Outcomes & Deployment Results
                </h3>
                <div className="space-y-2">
                  {project.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HARDWARE ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Architecture Pipeline Stages */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Signal & Data Flow Architecture
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.architectureDiagram.stages.map((st, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{st.step}</span>
                        <span className="text-[11px] font-mono text-slate-400">{st.tag}</span>
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{st.title}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill of Materials (BOM) */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Hardware Bill of Materials & Interfacing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.hardwareStack.map((hw, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{hw}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Features */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Hardware Protection & Fail-Safe Mechanisms
                </h3>
                <div className="space-y-2">
                  {project.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-mono text-blue-500 font-bold shrink-0">·</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIRMWARE & LOGIC */}
          {activeTab === 'firmware' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Firmware Implementation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Written in {project.codeSnippet.language.toUpperCase()} for microcontroller deployment.
                  </p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-slate-200 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
                  {project.codeSnippet.filename}
                </span>
              </div>

              {/* Code Snippet Container */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0c1017]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-slate-300">{project.codeSnippet.filename}</span>
                  </div>
                  <span>Embedded C++</span>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>

              {/* Technical Code Walkthrough */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Architecture Notes: </span>
                {project.codeSnippet.explanation}
              </div>

              {/* Firmware Stack List */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">FIRMWARE LIBRARIES & PROTOCOLS</div>
                <div className="flex flex-wrap gap-2">
                  {project.firmwareStack.map((fw, i) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Interactive Firmware State Machine Simulator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Manipulate live inputs, test debouncing, inspect UART serial output, and verify telemetry pipelines.
                </p>
              </div>

              {project.simulationType === 'sos' && <SosTrackerSimulator />}
              {project.simulationType === 'feeder' && <SmartFeederSimulator />}
              {project.simulationType === 'robot' && <LineFollowerSimulator />}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">ESC</kbd> to exit modal
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
