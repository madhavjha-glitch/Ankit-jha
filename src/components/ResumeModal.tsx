import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_LIST, CERTIFICATIONS, LANGUAGES } from '../data/portfolioData';
import { X, Printer, Copy, Check, Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `ANKIT KUMAR JHA
Darbhanga, Bihar | +91 9546452871 | ankitraj7530@gmail.com
linkedin.com/in/ankit-kumar-jha-518a6142b

PROFESSIONAL SUMMARY
Electronics and Computer Science engineering graduate with hands-on project experience in IoT, embedded systems, microcontroller programming, sensor interfacing, and hardware-software integration. Built prototypes involving ESP32, ESP8266, Arduino, GSM/GPS modules, and mobile-based monitoring. Knowledge of C, Python, SQL, Linux fundamentals, and embedded/network security basics.

TECHNICAL SKILLS
Programming: C, Python; Embedded C/C++ used in projects
Embedded Systems and IoT: ESP32, ESP8266 (NodeMCU), Arduino Nano, microcontrollers, GPS/GSM modules, IR and ultrasonic sensors, servo motors, DC motors, L298N/L293D motor drivers, circuit design, sensor interfacing, IoT architecture
Tools and Platforms: Arduino IDE, SoftwareSerial, Google Colab, Blynk IoT Platform
Data and Databases: SQL, data analysis, data visualization, Pandas, NumPy
Systems and Security: Embedded system security fundamentals, network security basics, Linux system administration basics

PROJECTS
Child Safety Device with SOS Alerts, Voice Calling and GPS Tracking (July 2024 – April 2025)
- Designed an IoT child-safety wearable with one-button SOS activation, two-way voice calling, and real-time GPS location tracking.
- Programmed ESP32 firmware using Embedded C/C++ and SoftwareSerial to trigger emergency SMS messages containing location links and initiate calls.
- Integrated SIM800L GSM/GPRS and NEO-6M GPS modules; incorporated circuit protection and fail-safe logic for reliable emergency operation.

Smart Pet Feeder (January 2024 – April 2024)
- Developed an automated pet-feeding prototype using a NodeMCU (ESP8266) and the Blynk IoT platform.
- Integrated an ultrasonic sensor for food-level monitoring and a servo motor for scheduled portion dispensing.
- Created a mobile dashboard for remote monitoring, telemetry visualization, and manual feeding controls.

Line Following Robot (April 2023 – December 2023)
- Built an autonomous robot using an Arduino Nano and infrared sensors to detect and follow predefined paths.
- Implemented C/C++ motor-control logic to adjust differential motor speed and direction based on sensor feedback.
- Connected DC motors through a dual H-bridge motor driver to support directional control and turning.

EDUCATION
Bachelor of Engineering (B.E.), Electronics & Computer Science
Pillai HOC College of Engineering and Technology, Rasayani, Maharashtra | 2021–2025 | CGPA: 6.1/10
Higher Secondary Certificate (Class XII)
KS College, Darbhanga, Bihar | 2019–2021 | 70%
Secondary School Certificate (Class X)
Rose Public School, Darbhanga, Bihar | 2018–2019 | CGPA: 7.7/10

CERTIFICATIONS
- Python Basics for Data Science — IBM
- Introduction to Linux — The Linux Foundation

LANGUAGES
English, Hindi`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white">Curriculum Vitae</span>
            <span className="text-xs text-slate-500 font-mono">· Ankit Kumar Jha</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Copy plain-text CV to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Container (Clean, Printable Resume Document) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-900 dark:text-slate-100 font-sans text-xs sm:text-sm print:p-0 print:text-black">
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-300 dark:border-slate-800 space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-slate-900 dark:text-white">
              ANKIT KUMAR JHA
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
              <span>Darbhanga, Bihar</span>
              <span aria-hidden="true">|</span>
              <a href="tel:+919546452871" className="hover:underline">+91 9546452871</a>
              <span aria-hidden="true">|</span>
              <a href="mailto:ankitraj7530@gmail.com" className="hover:underline">ankitraj7530@gmail.com</a>
              <span aria-hidden="true">|</span>
              <a href="https://linkedin.com/in/ankit-kumar-jha-518a6142b" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/ankit-kumar-jha-518a6142b</a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-[13px]">
              Electronics and Computer Science engineering graduate with hands-on project experience in IoT, embedded systems, microcontroller programming, sensor interfacing, and hardware-software integration. Built prototypes involving ESP32, ESP8266, Arduino, GSM/GPS modules, and mobile-based monitoring. Knowledge of C, Python, SQL, Linux fundamentals, and embedded/network security basics.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-xs sm:text-[13px]">
              <div>
                <strong className="text-slate-900 dark:text-white">Programming: </strong>
                <span className="text-slate-700 dark:text-slate-300">C, Python; Embedded C/C++ used in projects</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Embedded Systems and IoT: </strong>
                <span className="text-slate-700 dark:text-slate-300">ESP32, ESP8266 (NodeMCU), Arduino Nano, microcontrollers, GPS/GSM modules, IR and ultrasonic sensors, servo motors, DC motors, L298N/L293D motor drivers, circuit design, sensor interfacing, IoT architecture</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Tools and Platforms: </strong>
                <span className="text-slate-700 dark:text-slate-300">Arduino IDE, SoftwareSerial, Google Colab, Blynk IoT Platform</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Data and Databases: </strong>
                <span className="text-slate-700 dark:text-slate-300">SQL, data analysis, data visualization, Pandas, NumPy</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Systems and Security: </strong>
                <span className="text-slate-700 dark:text-slate-300">Embedded system security fundamentals, network security basics, Linux system administration basics</span>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              PROJECTS
            </h2>

            {/* Project 1 */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px]">
                  Child Safety Device with SOS Alerts, Voice Calling and GPS Tracking
                </h3>
                <span className="font-mono text-xs text-slate-500">July 2024 – April 2025</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px]">
                <li>Designed an IoT child-safety wearable with one-button SOS activation, two-way voice calling, and real-time GPS location tracking.</li>
                <li>Programmed ESP32 firmware using Embedded C/C++ and SoftwareSerial to trigger emergency SMS messages containing location links and initiate calls.</li>
                <li>Integrated SIM800L GSM/GPRS and NEO-6M GPS modules; incorporated circuit protection and fail-safe logic for reliable emergency operation.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px]">
                  Smart Pet Feeder
                </h3>
                <span className="font-mono text-xs text-slate-500">January 2024 – April 2024</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px]">
                <li>Developed an automated pet-feeding prototype using a NodeMCU (ESP8266) and the Blynk IoT platform.</li>
                <li>Integrated an ultrasonic sensor for food-level monitoring and a servo motor for scheduled portion dispensing.</li>
                <li>Created a mobile dashboard for remote monitoring, telemetry visualization, and manual feeding controls.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px]">
                  Line Following Robot
                </h3>
                <span className="font-mono text-xs text-slate-500">April 2023 – December 2023</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px]">
                <li>Built an autonomous robot using an Arduino Nano and infrared sensors to detect and follow predefined paths.</li>
                <li>Implemented C/C++ motor-control logic to adjust differential motor speed and direction based on sensor feedback.</li>
                <li>Connected DC motors through a dual H-bridge motor driver to support directional control and turning.</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              EDUCATION
            </h2>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px]">
                Bachelor of Engineering (B.E.), Electronics & Computer Science
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Pillai HOC College of Engineering and Technology, Rasayani, Maharashtra | 2021–2025 | CGPA: 6.1/10
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px]">
                Higher Secondary Certificate (Class XII)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                KS College, Darbhanga, Bihar | 2019–2021 | 70%
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px]">
                Secondary School Certificate (Class X)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Rose Public School, Darbhanga, Bihar | 2018–2019 | CGPA: 7.7/10
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px]">
              <li>Python Basics for Data Science — IBM</li>
              <li>Introduction to Linux — The Linux Foundation</li>
            </ul>
          </section>

          {/* Languages */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              LANGUAGES
            </h2>
            <div className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300">
              English, Hindi
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
