import React, { useState } from 'react';
import { SosTrackerSimulator, SmartFeederSimulator, LineFollowerSimulator } from './Simulators';
import { Cpu, Radio, Sliders, Terminal, Shield, Wifi, Navigation } from 'lucide-react';

interface HardwareLabProps {
  initialSimulator?: 'sos' | 'feeder' | 'robot';
}

export const HardwareLab: React.FC<HardwareLabProps> = ({
  initialSimulator = 'sos',
}) => {
  const [activeLab, setActiveLab] = useState<'sos' | 'feeder' | 'robot'>(initialSimulator);

  return (
    <section id="hardware-lab" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090c13]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Virtual Bench & Diagnostics
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              02. Interactive Hardware Testbench
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Interact directly with the firmware state machines, sensor calibration math, and telemetry dispatch routines modeled directly after physical hardware prototypes.
            </p>
          </div>

          {/* Testbench Selectors */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto overflow-x-auto">
            {[
              { id: 'sos', label: 'ESP32 SOS Tracker', icon: Radio },
              { id: 'feeder', label: 'ESP8266 Pet Feeder', icon: Wifi },
              { id: 'robot', label: 'Arduino Line Follower', icon: Navigation },
            ].map((bench) => {
              const Icon = bench.icon;
              return (
                <button
                  key={bench.id}
                  onClick={() => setActiveLab(bench.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeLab === bench.id
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-blue-500" />
                  <span>{bench.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Testbench Visualizer */}
        <div>
          {activeLab === 'sos' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Testbench Instructions: </span>
                Click the red tactile SOS button to fire a debounced hardware interrupt on GPIO 4. Watch the simulated FreeRTOS task query the NEO-6M GPS receiver for live coordinates, broadcast an SMS containing a Google Maps link to the guardian phone number over SIM800L, and initiate an active cellular call.
              </div>
              <SosTrackerSimulator />
            </div>
          )}

          {activeLab === 'feeder' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Testbench Instructions: </span>
                Use the slider to alter the dry food level in the hopper to test HC-SR04 ultrasonic echo timing and threshold warnings. Click &quot;Dispense Portion Now&quot; to trigger the Blynk Virtual Pin V1 webhook, sweeping the SG90 micro-servo from 0° to 90° with anti-jam jitter routines.
              </div>
              <SmartFeederSimulator />
            </div>
          )}

          {activeLab === 'robot' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Testbench Instructions: </span>
                Select different track profiles (Straight, Gentle Bend, Sharp 90° Corner) to test how the 4-channel TCRT5000 infrared reflectance array maps track error into differential PWM signals and directional H-bridge braking via the L298N driver.
              </div>
              <LineFollowerSimulator />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
