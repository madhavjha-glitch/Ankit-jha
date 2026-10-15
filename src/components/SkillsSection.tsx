import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { 
  Cpu, 
  Code, 
  Wifi, 
  Shield, 
  BarChart, 
  Terminal, 
  Zap, 
  Sliders, 
  Radio, 
  Database, 
  Activity, 
  MapPin, 
  PhoneCall, 
  Lock, 
  Wrench, 
  GitBranch, 
  TrendingUp, 
  Compass 
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'cpu': return <Cpu className="w-4 h-4 text-blue-500" />;
      case 'code': return <Code className="w-4 h-4 text-emerald-500" />;
      case 'terminal': return <Terminal className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'zap': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'sliders': return <Sliders className="w-4 h-4 text-indigo-500" />;
      case 'radio': return <Radio className="w-4 h-4 text-red-500" />;
      case 'cloud': return <Wifi className="w-4 h-4 text-sky-500" />;
      case 'wifi': return <Wifi className="w-4 h-4 text-sky-500" />;
      case 'database': return <Database className="w-4 h-4 text-purple-500" />;
      case 'activity': return <Activity className="w-4 h-4 text-orange-500" />;
      case 'phone-call': return <PhoneCall className="w-4 h-4 text-green-500" />;
      case 'map-pin': return <MapPin className="w-4 h-4 text-rose-500" />;
      case 'shield': return <Shield className="w-4 h-4 text-teal-500" />;
      case 'lock': return <Lock className="w-4 h-4 text-cyan-500" />;
      case 'tool': return <Wrench className="w-4 h-4 text-amber-500" />;
      case 'git-branch': return <GitBranch className="w-4 h-4 text-orange-500" />;
      case 'bar-chart': return <BarChart className="w-4 h-4 text-violet-500" />;
      case 'trending-up': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'compass': return <Compass className="w-4 h-4 text-yellow-500" />;
      default: return <Cpu className="w-4 h-4 text-blue-500" />;
    }
  };

  const displayedCategories = selectedCategory === 'all' 
    ? SKILL_CATEGORIES 
    : [SKILL_CATEGORIES[selectedCategory]];

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Engineering Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              03. Technical Skills & Architecture
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Practical expertise across silicon architectures, low-level firmware engineering, communications protocols, and analytical pipelines.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === idx
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-10">
          {displayedCategories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {cat.description}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-colors hover:border-slate-300 dark:hover:border-slate-700 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shrink-0">
                      {getIcon(skill.iconType)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono font-medium text-blue-600 dark:text-blue-400 shrink-0">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                        {skill.experience}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
