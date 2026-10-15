import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ChevronRight, Cpu, ArrowUpRight, CheckCircle2, Sliders } from 'lucide-react';

interface CaseStudiesProps {
  onSelectProject: (project: Project) => void;
  onOpenSimulatorForProject: (project: Project) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  onSelectProject,
  onOpenSimulatorForProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'iot' | 'telemetry' | 'robotics'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="case-studies" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Natural Editorial Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Featured Engineering Work
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              01. Project Case Studies
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              In-depth technical breakdowns of hardware prototypes, circuit diagrams, embedded C/C++ firmware, and real-world system deployments.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto overflow-x-auto">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'iot', label: 'IoT & Wearables' },
              { id: 'telemetry', label: 'Cloud & Telemetry' },
              { id: 'robotics', label: 'Robotics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 md:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Visual Media Column */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-4/3 relative group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white font-medium inline-flex items-center gap-1">
                        Click to view deep-dive case study <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Hardware BOM Summary */}
                  <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="font-semibold text-slate-900 dark:text-slate-200 mb-1.5 flex items-center justify-between">
                      <span>Core Silicon & Components</span>
                      <span className="font-mono text-[10px] text-slate-400">{project.hardwareStack.length} Modules</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px] font-mono">
                      {project.hardwareStack.slice(0, 3).join(" · ")}
                    </div>
                  </div>
                </div>

                {/* Content Breakdown Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.period}</span>
                    </div>

                    {/* Headline Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                      {project.title}
                    </h3>

                    {/* Problem & Solution Narrative */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {project.overview}
                    </p>

                    {/* Verified Metrics Strip */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="text-left">
                          <div className="text-xs text-slate-500 dark:text-slate-400">{m.label}</div>
                          <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Technical Highlights */}
                    <div className="space-y-2 mb-6">
                      {project.keyFeatures.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Case Study Deep-Dive & Testbench */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Read Case Study Deep-Dive</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenSimulatorForProject(project)}
                      className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <Sliders className="w-3.5 h-3.5 text-blue-500" />
                      <span>Run Live Testbench</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
