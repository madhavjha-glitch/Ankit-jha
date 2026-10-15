import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Cpu, 
  ChevronRight, 
  FileDown, 
  MapPin, 
  Mail, 
  Phone, 
  Activity, 
  Sparkles, 
  Zap, 
  Check, 
  Info,
  Maximize2
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
  onOpenLab: () => void;
}

interface HardwareHotspot {
  id: string;
  name: string;
  tag: string;
  desc: string;
  x: string;
  y: string;
}

const HOTSPOTS: HardwareHotspot[] = [
  {
    id: 'esp32',
    name: 'ESP32 Dual-Core SoC',
    tag: '240MHz Xtensa LX6',
    desc: 'Dual-core silicon executing FreeRTOS preemptive tasks, hardware timer interrupts, and Wi-Fi/BLE stacks.',
    x: '48%',
    y: '48%',
  },
  {
    id: 'oled',
    name: 'I2C OLED Display',
    tag: 'SSD1306 128x64 Telemetry',
    desc: 'Reports live system health, sensor readings (24.5°C), and serial bus communications in real time.',
    x: '78%',
    y: '58%',
  },
  {
    id: 'probe',
    name: 'Oscilloscope Probe',
    tag: 'Signal Integrity Analysis',
    desc: 'Analyzes high-speed SPI/UART edge transitions, pulse jitter, and bus rise-time dynamics.',
    x: '20%',
    y: '52%',
  },
  {
    id: 'caps',
    name: 'Decoupling Capacitor Bank',
    tag: 'Low-ESR Voltage Stabilization',
    desc: 'Suppresses 2A peak current surges during GSM burst transmissions to prevent brownout microcontroller resets.',
    x: '52%',
    y: '82%',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onExploreProjects,
  onOpenLab,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<HardwareHotspot | null>(HOTSPOTS[0]);

  return (
    <section 
      id="about" 
      className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white dark:from-[#060913] dark:via-[#080d1a] dark:to-[#070b14] transition-colors duration-300"
    >
      {/* Premium Ambient Glows & Layered Backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none bg-tech-grid-light dark:bg-tech-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_15%,#000_60%,transparent_100%)] opacity-80"
        aria-hidden="true" 
      />

      {/* Deep Atmospheric Lighting Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-sky-500/10 dark:bg-sky-500/10 blur-[100px] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero: Left Text & Right Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Quiet Kicker with subtle engineering styling */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/50 text-[11px] font-mono font-medium text-blue-700 dark:text-blue-300 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>ELECTRONICS & COMPUTER SCIENCE ENGINEER</span>
                <span className="text-blue-400 dark:text-blue-500">·</span>
                <span>IOT & EMBEDDED SYSTEMS</span>
              </div>

              {/* Prominent Name Presentation */}
              <div className="mb-3">
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400 font-mono block">
                  Hi, I&apos;m
                </span>
                <div className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 dark:text-white mt-1">
                  Ankit Jha
                </div>
              </div>

              {/* Dominant Modern Display Headline with Text-Wrap Balance */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-700 dark:text-slate-200 leading-[1.2] text-balance mb-6">
                Engineering tangible hardware, sensor telemetry, and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300">
                  connected intelligence.
                </span>
              </h1>

              {/* Lead Copy with Domain Keywords */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
                Designing production-ready embedded prototypes with <strong className="font-semibold text-slate-900 dark:text-white">ESP32, ESP8266, and Arduino Nano</strong>. Proven experience integrating real-time GSM/GPS cellular calling, ultrasonic cloud telemetry on Blynk, and autonomous differential mobile robotics.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <button
                  onClick={onExploreProjects}
                  className="px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Explore Case Studies</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenLab}
                  className="px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer border border-slate-300 dark:border-slate-700/80 shadow-xs active:scale-98"
                >
                  <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Interactive Testbench</span>
                </button>

                <button
                  onClick={onOpenResume}
                  className="px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-slate-400" />
                  <span>Resume PDF</span>
                </button>
              </div>
            </div>

            {/* Quick Contact & Verified Location Ribbon */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Darbhanga, Bihar / Maharashtra</span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <a href="mailto:ankitraj7530@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>ankitraj7530@gmail.com</span>
              </a>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <a href="tel:+919546452871" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 9546452871</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Fidelity Engineering Visual with Interactive Component Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-300/80 dark:border-slate-700/80 bg-slate-950 shadow-2xl group">
              <img
                src="/src/assets/images/hero_iot_hardware_1792086649166.jpg"
                alt="IoT Hardware Workbench with ESP32 and Oscilloscope"
                className="w-full h-[380px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle contrast gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Floating Top Header on image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-slate-200 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FreeRTOS Core 0: Active</span>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-sky-300">
                  115200 Baud
                </div>
              </div>

              {/* Interactive Inspection Hotspots on the Hardware */}
              {HOTSPOTS.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    style={{ left: spot.x, top: spot.y }}
                    aria-label={`Inspect ${spot.name}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer z-10 ${
                      isSelected
                        ? 'bg-blue-500 text-white ring-4 ring-blue-500/40 scale-110 shadow-lg'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-500/80 hover:bg-blue-600 hover:text-white'
                    }`}
                    title={spot.name}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </button>
                );
              })}

              {/* Interactive Inspection Card on Bottom */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-200 transition-all">
                {selectedHotspot ? (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-blue-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        {selectedHotspot.name}
                      </span>
                      <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono">
                        {selectedHotspot.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {selectedHotspot.desc}
                    </p>
                    <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1.5">
                      <span>Click dots to inspect circuit modules</span>
                      <span className="text-slate-400">4/4 Nodes</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-mono">
                    Click any marker on the circuit board to inspect hardware architecture.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Proof & KPI Strip below the hero split */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-xs group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                3+
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                Hardware Prototypes Shipped
              </div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                Wearable · Pet Feeder · Robotics
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-xs group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                4
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                Microcontroller Platforms
              </div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                ESP32 · NodeMCU · Nano · ATmega
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-xs group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                2
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                Industry Certifications
              </div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                IBM Python · Linux Foundation
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-xs group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                2025
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                B.E. Electronics & Computer Science
              </div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                Pillai HOC College of Engg.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
