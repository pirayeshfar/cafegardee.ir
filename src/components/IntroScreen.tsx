import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
  customLogoUrl?: string | null;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete, customLogoUrl }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Reveal logo & title, then fade out after 1.8 seconds
    const timer = setTimeout(() => {
      setFading(true);
    }, 1800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-lg transition-transform duration-1000 ease-out transform">
        
        {/* Custom Logo if uploaded, else delicate golden emblem */}
        {customLogoUrl ? (
          <img
            src={customLogoUrl}
            alt="Cafegardee Logo"
            className="w-24 h-24 object-contain rounded-2xl mb-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] border border-stone-800 animate-in fade-in zoom-in-90 duration-700"
          />
        ) : (
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-stone-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.3)]">
              <svg 
                className="w-10 h-10" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.75" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
            </div>
          </div>
        )}

        {/* Brand Typographic Statement: Pure White with Soft Deep Shadow */}
        <div className="relative">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-sans drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
            Cafegardee<span className="text-amber-500 font-normal">.ir</span>
          </h1>
          <div className="absolute -inset-1 bg-white/5 blur-xl -z-10 rounded-full" />
        </div>

        {/* Hairline Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent my-5" />

        {/* Persian Subtitle */}
        <p className="text-sm sm:text-base font-medium text-stone-300 tracking-wide">
          شبکه تخصصی باریستاها و کافه‌های ایران
        </p>

        {/* Foundation Milestone */}
        <div className="flex items-center gap-2 mt-3 text-xs text-amber-500 font-mono tracking-widest">
          <span>EST. 2017</span>
          <span aria-hidden="true" className="text-stone-700">·</span>
          <span>تاسیس ۱۳۹۶</span>
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            setFading(true);
            setTimeout(onComplete, 300);
          }}
          className="mt-10 px-5 py-2 text-xs text-stone-500 hover:text-stone-300 border border-stone-900 hover:border-stone-800 rounded-full transition-all cursor-pointer backdrop-blur-sm"
        >
          ورود به وب‌سایت ←
        </button>

      </div>
    </div>
  );
};
