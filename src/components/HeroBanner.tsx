import React from 'react';
import { Search, MapPin, Award, CheckCircle2, UserCheck, Coffee } from 'lucide-react';
import { CITIES_LIST, SPECIALTY_SKILLS_LIST } from '../data/initialData';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  selectedSkill: string;
  setSelectedSkill: (s: string) => void;
  onOpenRegister: (type: 'barista' | 'cafe') => void;
  activeTab: 'baristas' | 'jobs' | 'about';
  setActiveTab: (tab: 'baristas' | 'jobs' | 'about') => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedSkill,
  setSelectedSkill,
  onOpenRegister,
  activeTab,
  setActiveTab,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-800 bg-stone-950">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_coffee_bar_1793000893504.jpg"
          alt="فضای کافه تخصصی و بار اسپرسو"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.32] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-16 lg:pb-20">
        
        {/* Top Kicker - Unboxed text (Zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-amber-400 mb-4 tracking-wide">
          <span className="font-bold">کافه‌گردی پرو</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>شبکه باریستاها و کاریابی تخصصی کافه‌های ایران</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="font-mono text-stone-300">تاسیس ۱۳۹۶ (۲۰۱۷) · cafegardee.ir</span>
        </div>

        {/* Headline with text-wrap: balance & rich Persian typography */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 leading-[1.25] tracking-tight mb-4 [text-wrap:balance]">
            بانک تخصصی{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-amber-100 to-amber-500 drop-shadow-sm">
              باریستاهای ایران
            </span>{' '}
            و جذب نیروی ماهر برای کافه‌ها
          </h1>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-2xl font-light">
            راهکار مستقیم برای پایان دادن به بی‌نظمی استوری‌های اینستاگرامی؛ رزومه، تخصص دستگاه‌ها و سابقه کاری باریستاهای ماهر را در یک نگاه بررسی کنید و سریع‌ترین همکاری کاری را شکل دهید.
          </p>
        </div>

        {/* Search & Filter Command Strip */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md max-w-4xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Input Search */}
            <div className="sm:col-span-5 relative">
              <label htmlFor="search-input" className="sr-only">جستجو</label>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-input"
                type="text"
                placeholder="جستجوی نام باریستا، کافه یا مهارت..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-3 bg-stone-950/80 border border-stone-700/80 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* City Selector */}
            <div className="sm:col-span-3 relative">
              <label htmlFor="city-select" className="sr-only">انتخاب شهر</label>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-3 pr-9 py-3 bg-stone-950/80 border border-stone-700/80 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                {CITIES_LIST.map((city) => (
                  <option key={city} value={city} className="bg-stone-900 text-stone-200">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty Skill Selector */}
            <div className="sm:col-span-4 relative">
              <label htmlFor="skill-select" className="sr-only">تخصص باریستا</label>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
                <Award className="w-4 h-4" />
              </div>
              <select
                id="skill-select"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full pl-3 pr-9 py-3 bg-stone-950/80 border border-stone-700/80 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors cursor-pointer truncate"
              >
                {SPECIALTY_SKILLS_LIST.map((skill) => (
                  <option key={skill} value={skill} className="bg-stone-900 text-stone-200">
                    {skill}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick tab switcher & Direct Action in Strip */}
          <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 p-1 bg-stone-950/60 rounded-lg border border-stone-800">
              <button
                onClick={() => setActiveTab('baristas')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'baristas'
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                مشاهده باریستاها
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'jobs'
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                آگهی‌های استخدام کافه
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenRegister('barista')}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg font-medium transition-colors"
              >
                من باریستا هستم (ثبت رزومه)
              </button>
              <button
                onClick={() => onOpenRegister('cafe')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors"
              >
                من کافه‌دار هستم (ثبت آگهی)
              </button>
            </div>
          </div>
        </div>

        {/* 3 Quantified Impact Metrics (Claim-to-proof adjacency) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl pt-2">
          
          <div className="flex items-start gap-3 bg-stone-900/40 border border-stone-800/80 p-4 rounded-xl">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-stone-100 tabular-nums">۳۸۰+ باریستا</div>
              <div className="text-xs text-stone-400 mt-0.5">پروفایل‌های تخصصی ثبت‌شده با سوابق تایید شده</div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-stone-900/40 border border-stone-800/80 p-4 rounded-xl">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-stone-100 tabular-nums">۱۲۰+ کافه فعال</div>
              <div className="text-xs text-stone-400 mt-0.5">در شهرهای تهران، اصفهان، شیراز، مشهد و رشت</div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-stone-900/40 border border-stone-800/80 p-4 rounded-xl">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-stone-100 tabular-nums">۱۰۰٪ مستقیم و رایگان</div>
              <div className="text-xs text-stone-400 mt-0.5">تماس، پیامک و تلگرام بدون کارمزد یا واسطه</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
