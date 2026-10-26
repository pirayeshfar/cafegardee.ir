import React from 'react';
import { Coffee, Plus, Users, Briefcase, Sparkles, Menu, X, Shield, Heart, User, Bell } from 'lucide-react';
import { SiteSettings, Barista } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface NavbarProps {
  activeTab: 'baristas' | 'jobs' | 'cafes' | 'about';
  setActiveTab: (tab: 'baristas' | 'jobs' | 'cafes' | 'about') => void;
  onOpenRegister: (defaultType: 'barista' | 'cafe') => void;
  onOpenAdmin: () => void;
  onOpenDonation: () => void;
  onOpenBaristaDashboard: () => void;
  currentBarista: Barista | null;
  unreadOffersCount: number;
  totalBaristas: number;
  totalJobs: number;
  siteSettings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegister,
  onOpenAdmin,
  onOpenDonation,
  onOpenBaristaDashboard,
  currentBarista,
  unreadOffersCount,
  totalBaristas,
  totalJobs,
  siteSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('baristas')}
              className="flex items-center gap-3 text-right group focus:outline-none cursor-pointer"
            >
              {siteSettings.customLogoUrl ? (
                <div className="h-11 w-11 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center p-0.5 shadow-md">
                  <img
                    src={siteSettings.customLogoUrl}
                    alt={siteSettings.siteName}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500 group-hover:bg-amber-600/30 transition-colors">
                  <Coffee className="w-5 h-5" />
                </div>
              )}

              <div className="flex items-center">
                <span className="text-xl font-black tracking-tight text-stone-100 whitespace-nowrap">
                  {siteSettings.siteName.split(' ')[0]}
                </span>
                <span className="text-amber-500 font-black text-sm tracking-widest px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 mr-1.5">
                  PRO
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-300">
            <button
              onClick={() => setActiveTab('baristas')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'baristas' ? 'text-amber-400 border-amber-500 font-bold' : 'border-transparent text-stone-400'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>بانک باریستاها</span>
              <span className="text-xs text-stone-500 font-mono">({toPersianDigits(totalBaristas)})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'jobs' ? 'text-amber-400 border-amber-500 font-bold' : 'border-transparent text-stone-400'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>فرصت‌های استخدامی</span>
              <span className="text-xs text-stone-500 font-mono">({toPersianDigits(totalJobs)})</span>
            </button>

            <button
              onClick={() => setActiveTab('cafes')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cafes' ? 'text-amber-400 border-amber-500 font-bold' : 'border-transparent text-stone-400'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>کافه‌های ویژه</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'about' ? 'text-amber-400 border-amber-500 font-bold' : 'border-transparent text-stone-400'
              }`}
            >
              <span>درباره و موسس</span>
            </button>
          </nav>

          {/* Zone 3: Actions + Barista Profile + Donation + Admin */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Barista Profile Access */}
            {currentBarista ? (
              <button
                onClick={onOpenBaristaDashboard}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer group"
                title="مشاهده پیام‌ها و پیشنهادهای کاری شما"
              >
                <div className="w-6 h-6 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
                  <img
                    src={currentBarista.avatarUrl}
                    alt={currentBarista.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-stone-200 group-hover:text-amber-400">
                  {currentBarista.name.split(' ')[0]}
                </span>
                {unreadOffersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center font-mono">
                    {toPersianDigits(unreadOffersCount)}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenBaristaDashboard}
                className="px-3 py-2 text-xs font-semibold text-stone-300 hover:text-amber-300 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>ورود باریستا</span>
              </button>
            )}

            {/* Donation Trigger */}
            <button
              onClick={onOpenDonation}
              className="px-3 py-2 text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="حمایت مالی از پروژه مستقل کافه‌گردی"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>حمایت از ما</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenRegister('barista')}
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت رایگان</span>
            </button>

            {/* Admin Login button */}
            <button
              onClick={onOpenAdmin}
              title="ورود مدیر و بارگذاری لوگو"
              className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-900 rounded-lg border border-stone-800 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBaristaDashboard}
              className="p-2 text-amber-400 bg-stone-900 border border-stone-800 rounded-lg relative"
              title="پروفایل باریستا"
            >
              <User className="w-4 h-4" />
              {unreadOffersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[9px] flex items-center justify-center">
                  {toPersianDigits(unreadOffersCount)}
                </span>
              )}
            </button>
            <button
              onClick={onOpenDonation}
              className="p-2 text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-lg"
              title="حمایت مالی"
            >
              <Heart className="w-4 h-4 fill-rose-400" />
            </button>
            <button
              onClick={() => onOpenRegister('barista')}
              className="px-2.5 py-1.5 text-[11px] font-bold text-stone-950 bg-amber-500 rounded-lg"
            >
              + ثبت
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-400 hover:text-stone-100 focus:outline-none"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-4 py-4 space-y-3">
          
          {/* Barista Profile Mobile Bar */}
          <button
            onClick={() => {
              onOpenBaristaDashboard();
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2.5 px-3 bg-amber-950/30 border border-amber-800/40 rounded-xl flex items-center justify-between text-xs text-amber-300 font-bold"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {currentBarista ? `پروفایل و پیام‌های ${currentBarista.name}` : 'ورود به پروفایل کاربری باریستا'}
            </span>
            {unreadOffersCount > 0 && (
              <span className="bg-amber-500 text-stone-950 text-[10px] px-1.5 py-0.5 rounded-full">
                {toPersianDigits(unreadOffersCount)} پیام جدید
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('baristas');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-right py-2 px-3 rounded-lg flex items-center justify-between text-sm ${
              activeTab === 'baristas' ? 'bg-amber-950/40 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              بانک باریستاها
            </span>
            <span className="text-xs font-mono text-stone-500">({toPersianDigits(totalBaristas)})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('jobs');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-right py-2 px-3 rounded-lg flex items-center justify-between text-sm ${
              activeTab === 'jobs' ? 'bg-amber-950/40 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              فرصت‌های استخدامی کافه
            </span>
            <span className="text-xs font-mono text-stone-500">({toPersianDigits(totalJobs)})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('cafes');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-right py-2 px-3 rounded-lg flex items-center gap-2 text-sm ${
              activeTab === 'cafes' ? 'bg-amber-950/40 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            کافه‌های ویژه ماه (پایش هوشمند)
          </button>

          <button
            onClick={() => {
              setActiveTab('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-right py-2 px-3 rounded-lg flex items-center gap-2 text-sm ${
              activeTab === 'about' ? 'bg-amber-950/40 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            درباره و موسس (امیرسامان پیرایش فر)
          </button>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenDonation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-bold text-center bg-rose-950/50 text-rose-300 border border-rose-800/60 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-rose-400" />
              <span>حمایت از ما در حامی‌باش</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-medium text-center text-stone-400 bg-stone-900 border border-stone-800 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>ورود مدیر سایت و بارگذاری لوگو</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
