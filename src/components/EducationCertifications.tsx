import React from 'react';
import { EDUCATION_LIST, CERTIFICATIONS, LANGUAGES } from '../data/portfolioData';
import { GraduationCap, Award, Globe, CheckCircle2, MapPin, Calendar } from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090c13]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
            Academic Background & Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            04. Education & Certifications
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Formal engineering foundations in Electronics & Computer Science, complemented by verified industry credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Academic Degrees
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION_LIST.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0 tabular-nums">
                      {edu.score}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mb-2">
                    {edu.institution}
                  </div>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{edu.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{edu.period}</span>
                    </span>
                  </div>

                  {edu.highlights && (
                    <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      {edu.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <span className="font-mono text-blue-500 font-bold shrink-0">·</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="lg:col-span-5 space-y-8">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Industry Certifications
                </h3>
              </div>

              <div className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
                        {cert.issuer}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {cert.verificationNote}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      {cert.skillsCovered.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-mono text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                <Globe className="w-5 h-5 text-sky-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Languages
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {lang.language}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang.proficiency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
