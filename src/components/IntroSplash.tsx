import React, { useState, useEffect } from 'react';
import { Cpu, ArrowRight } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'entering' | 'revealed' | 'exiting'>('entering');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Reveal name immediately
    const enterTimer = setTimeout(() => {
      setPhase('revealed');
    }, 150);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Phase 2: Start exit transition after ~1.4 seconds
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 1500);

    // Phase 3: Complete and unmount after transition finishes
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 1900);

    return () => {
      clearTimeout(enterTimer);
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050811] text-white transition-all duration-500 ease-in-out select-none ${
        phase === 'exiting' ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      onClick={onComplete}
      title="Click anywhere to skip intro"
    >
      {/* Ambient background glows */}
      <div 
        className="absolute w-[32rem] h-[32rem] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute w-[24rem] h-[24rem] rounded-full bg-sky-500/10 blur-[90px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Center Branding Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Subtle engineering chip icon */}
        <div 
          className={`w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10 transition-all duration-700 ${
            phase === 'entering' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
        >
          <Cpu className="w-6 h-6 text-blue-400 animate-pulse" />
        </div>

        {/* Quiet Subtitle / Kicker */}
        <div 
          className={`text-xs font-mono tracking-widest text-blue-400 uppercase mb-2 transition-all duration-500 delay-100 ${
            phase === 'entering' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          ELECTRONICS & IOT PORTFOLIO
        </div>

        {/* Large Prominent Name: ANKIT JHA */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 transition-all duration-700 delay-150 ${
            phase === 'entering' ? 'opacity-0 translate-y-3 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-300">
            ANKIT JHA
          </span>
        </h1>

        {/* Profession Tagline */}
        <p 
          className={`text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-8 transition-all duration-500 delay-200 ${
            phase === 'entering' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          Embedded Systems · Hardware Design · Firmware Engineering
        </p>

        {/* Hardware Initialization Progress Bar */}
        <div className="w-56 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 mb-3">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 cursor-pointer hover:text-slate-400 transition-colors">
          <span>Click anywhere to enter</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </div>
      </div>
    </div>
  );
};
