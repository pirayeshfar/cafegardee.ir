import React from 'react';
import { Coffee, Shield, Award, Heart } from 'lucide-react';
import { SiteSettings } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface FooterProps {
  setActiveTab: (tab: 'baristas' | 'jobs' | 'cafes' | 'about') => void;
  onOpenRegister: (type: 'barista' | 'cafe') => void;
  onOpenAdmin: () => void;
  onOpenDonation: () => void;
  siteSettings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenRegister,
  onOpenAdmin,
  onOpenDonation,
  siteSettings,
}) => {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 text-stone-400 py-12 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-900">
          
          {/* Brand & Founder Lockup */}
          <div className="flex items-center gap-3">
            {siteSettings.customLogoUrl ? (
              <img
                src={siteSettings.customLogoUrl}
                alt={siteSettings.siteName}
                className="w-10 h-10 object-contain rounded-lg bg-stone-900 border border-stone-800"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500">
                <Coffee className="w-5 h-5" />
              </div>
            )}

            <div>
              <div className="text-stone-100 font-bold text-base flex items-center gap-2">
                <span>{siteSettings.siteName}</span>
                <span className="font-mono text-amber-500 text-xs font-normal">cafegardee.ir</span>
              </div>
              <div className="text-xs text-stone-400 mt-1 font-light flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  بنیان‌گذار: <strong className="text-stone-200 font-semibold">{siteSettings.founderName}</strong> (فعالیت مستمر از سال <span className="font-mono tabular-nums">{toPersianDigits(siteSettings.founderSinceYear)}</span> · ۱۳۹۶)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-5 text-stone-400">
            <button
              onClick={() => setActiveTab('baristas')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              بانک باریستاها
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              آگهی‌های کافه
            </button>
            <button
              onClick={() => setActiveTab('cafes')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              کافه‌های ویژه
            </button>
            <button
              onClick={() => onOpenDonation()}
              className="hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1 text-rose-300/90"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <span>حمایت مالی</span>
            </button>
            <button
              onClick={() => onOpenRegister('barista')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              ثبت رزومه
            </button>
            <button
              onClick={() => onOpenAdmin()}
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>پنل مدیریت</span>
            </button>
          </div>

        </div>

        {/* Detailed Copyright Statement */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px] font-light">
          <div>
            © {toPersianDigits(siteSettings.founderSinceYear)}–{toPersianDigits(new Date().getFullYear())} (۱۳۹۶–۱۴۰۵) cafegardee.ir · کلیه حقوق مادی و معنوی این اثر متعلق به برند کافه‌گردی و بنیان‌گذار آن (<strong className="text-stone-300 font-normal">{siteSettings.founderName}</strong>) می‌باشد.
          </div>
          <div className="text-stone-500 font-mono">
            پلتفرم کاملاً مستقل و رایگان برای فعالان صنعت قهوه ایران
          </div>
        </div>

      </div>
    </footer>
  );
};
