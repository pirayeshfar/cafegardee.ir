import React, { useState } from 'react';
import { SponsoredCafe } from '../types';
import { Coffee, MapPin, Sparkles, Phone, ExternalLink, Tag, RefreshCw, Cpu, CheckCircle2, Instagram, Search } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface FeaturedCafesSectionProps {
  cafes: SponsoredCafe[];
  onOpenRegisterCafe: () => void;
  onUpdateCafeNeeds?: (cafeId: string, updatedCafe: Partial<SponsoredCafe>) => void;
}

export const FeaturedCafesSection: React.FC<FeaturedCafesSectionProps> = ({
  cafes,
  onOpenRegisterCafe,
  onUpdateCafeNeeds,
}) => {
  const [scanningCafeId, setScanningCafeId] = useState<string | null>(null);
  const [customHandle, setCustomHandle] = useState('');
  const [analyzingCustom, setAnalyzingCustom] = useState(false);
  const [customAnalysisResult, setCustomAnalysisResult] = useState<any | null>(null);

  // Simulate smart live scan of Instagram story & bio
  const handleSmartScan = (cafe: SponsoredCafe) => {
    setScanningCafeId(cafe.id);
    setTimeout(() => {
      setScanningCafeId(null);
      if (onUpdateCafeNeeds) {
        const simulatedUpdates = [
          {
            detectedNeeds: ['استوری جدید: نیازمند باریستا شیفت عصر', 'آشنایی کامل با لاته آرت و تنظیم گریندر'],
            storyHighlight: `استوری ۱۰ دقیقه پیش @${cafe.websiteOrInstagram}: به ۲ باریستای منظم برای شیفت عصر بار گرم نیازمندیم (حقوق مکفی + بیمه)`,
            lastScanTime: 'همین الان',
            hiringNow: true,
          },
          {
            detectedNeeds: ['کالیبراسیون دستگاه دمی موج سوم', 'کمک باریستا شیفت صبح'],
            storyHighlight: `پست اخیر @${cafe.websiteOrInstagram}: دانه‌های تازه روستر شارژ شد. جهت شیفت صبح مصاحبه حضوری داریم.`,
            lastScanTime: 'همین الان',
            hiringNow: true,
          }
        ];
        const randomUpdate = simulatedUpdates[Math.floor(Math.random() * simulatedUpdates.length)];
        onUpdateCafeNeeds(cafe.id, randomUpdate);
      }
    }, 1400);
  };

  // Analyze any Instagram page or cafe website
  const handleAnalyzeCustomHandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHandle.trim()) return;
    setAnalyzingCustom(true);
    setCustomAnalysisResult(null);

    setTimeout(() => {
      setAnalyzingCustom(false);
      const cleanHandle = customHandle.replace('@', '').replace('https://instagram.com/', '').replace('/', '');
      setCustomAnalysisResult({
        handle: cleanHandle,
        detectedCafeName: `کافه ${cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1)}`,
        status: 'نیاز استخدامی فعال شناسایی شد',
        needs: [
          'استخدام سر باریستا با سابقه کالیبراسیون آسیاب‌های تخصصی',
          'تسلط به دستگاه‌های مولتی‌بویلر و متدهای دمی V60',
          'شیفت عصر و روزهای پایانی هفته'
        ],
        extractedMachines: 'La Marzocco / Nuova Simonelli',
        lastStoryTime: '۳۴ دقیقه پیش در استوری پیج',
      });
    }, 1500);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>سیستم هوشمند پایش نیازمندی‌های اینستاگرام کافه‌ها</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            کافه‌های ویژه و نیازهای لحظه‌ای بار
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            این بخش به طور خودکار استوری‌ها و اطلاعات پیج‌های معتبر کافه‌ها را تحلیل کرده و نیازمندی‌های شغلی جدید را استخراج می‌کند.
          </p>
        </div>

        <button
          onClick={onOpenRegisterCafe}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer shadow-md"
        >
          <span>ثبت رایگان کافه در سامانه</span>
        </button>
      </div>

      {/* Smart Instagram Scanner Tool Banner */}
      <div className="bg-stone-900/80 border border-amber-900/40 rounded-2xl p-4 sm:p-5 mb-10 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Instagram className="w-4 h-4" />
              <span>آنالایزر هوشمند استوری و پیج کافه (Smart Barista Needs Detector)</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              آیدی اینستاگرام کافه مورد نظر خود را وارد کنید تا هوش مصنوعی آخرین استوری‌ها و نیازمندی‌های استخدامی بار گرم/سرد آن را استخراج نماید:
            </p>
          </div>

          <form onSubmit={handleAnalyzeCustomHandle} className="w-full lg:w-auto flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="مثال: sam.cafe یا @type.cafe"
                value={customHandle}
                onChange={(e) => setCustomHandle(e.target.value)}
                className="w-full pl-3 pr-4 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono placeholder-stone-500 focus:outline-none focus:border-amber-500 text-left"
              />
            </div>
            <button
              type="submit"
              disabled={analyzingCustom}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-600/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Search className={`w-3.5 h-3.5 ${analyzingCustom ? 'animate-spin' : ''}`} />
              <span>{analyzingCustom ? 'در حال اسکن پیج...' : 'آنالیز استوری'}</span>
            </button>
          </form>
        </div>

        {/* Live Analysis Result Dropdown */}
        {customAnalysisResult && (
          <div className="mt-4 pt-4 border-t border-stone-800 animate-in fade-in duration-300 bg-stone-950/60 p-4 rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-stone-100">
                  تحلیل هوشمند @{customAnalysisResult.handle} ({customAnalysisResult.detectedCafeName})
                </span>
              </div>
              <span className="text-[11px] text-amber-400 font-mono">
                {customAnalysisResult.lastStoryTime}
              </span>
            </div>

            <div className="space-y-1 text-xs text-stone-300">
              <div className="font-medium text-stone-400 text-[11px]">نیازمندی‌های استخراج شده از محتوای کافه:</div>
              {customAnalysisResult.needs.map((need: string, i: number) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-stone-200">
                  <span className="text-amber-500">·</span>
                  <span>{need}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Sponsored / Featured Cafes with Smart Live Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cafes.map((cafe) => (
          <div
            key={cafe.id}
            className="bg-stone-900/60 border border-stone-800 hover:border-amber-600/50 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Image banner with overlay */}
              <div className="relative h-44 overflow-hidden bg-stone-950">
                <img
                  src={cafe.featuredImageUrl}
                  alt={cafe.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                <div className="absolute top-3 right-3 bg-amber-500/90 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>کافه منتخب</span>
                </div>

                {cafe.hiringNow && (
                  <div className="absolute top-3 left-3 bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    استخدام فعال در بار
                  </div>
                )}

                <div className="absolute bottom-3 right-3 left-3">
                  <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors drop-shadow">
                    {cafe.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-stone-300 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{cafe.city} ({cafe.neighborhood})</span>
                  </div>
                </div>
              </div>

              {/* Smart Live Story & Needs Highlight */}
              {cafe.storyHighlight && (
                <div className="bg-amber-950/40 border-b border-stone-800/80 p-3 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                  <Instagram className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-amber-300">تحلیل هوشمند استوری:</span>
                    <span className="line-clamp-2">{cafe.storyHighlight}</span>
                  </div>
                </div>
              )}

              {/* Cafe details */}
              <div className="p-5 space-y-3 text-xs">
                <p className="text-stone-300 line-clamp-2 leading-relaxed font-light">
                  {cafe.tagline}
                </p>

                {/* Detected Live Needs Tags */}
                {cafe.detectedNeeds && cafe.detectedNeeds.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] text-stone-400 font-semibold flex items-center justify-between">
                      <span>نیازهای استخراج شده:</span>
                      <span className="font-mono text-stone-500 text-[10px]">{cafe.lastScanTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cafe.detectedNeeds.map((need, idx) => (
                        <span key={idx} className="bg-stone-950 text-amber-300/90 border border-stone-800 text-[11px] px-2 py-0.5 rounded">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 pt-2 border-t border-stone-800/80 text-[11px]">
                  <div className="flex items-center justify-between text-stone-400">
                    <span>قهوه شاخص:</span>
                    <span className="text-stone-200 font-medium">{cafe.specialtyCoffee}</span>
                  </div>

                  <div className="flex items-center justify-between text-stone-400">
                    <span>دستگاه بار:</span>
                    <span className="font-mono text-amber-300">{cafe.machine}</span>
                  </div>
                </div>

                {cafe.discountOffer && (
                  <div className="bg-stone-950 border border-stone-800 p-2 rounded-xl text-stone-300 text-[11px] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{cafe.discountOffer}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons & Smart refresh */}
            <div className="p-4 pt-0 space-y-2">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${cafe.phone}`}
                  className="flex-1 py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تماس با کافه</span>
                </a>

                <a
                  href={`https://instagram.com/${cafe.websiteOrInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-stone-100 border border-stone-800 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>اینستاگرام</span>
                </a>
              </div>

              {/* Instant smart rescan button */}
              <button
                type="button"
                onClick={() => handleSmartScan(cafe)}
                disabled={scanningCafeId === cafe.id}
                className="w-full py-1.5 text-[11px] text-stone-400 hover:text-amber-400 bg-stone-950/60 hover:bg-stone-950 rounded-lg border border-stone-800/80 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${scanningCafeId === cafe.id ? 'animate-spin text-amber-400' : ''}`} />
                <span>{scanningCafeId === cafe.id ? 'در حال پایش زنده استوری...' : 'به‌روزرسانی هوشمند نیازها'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
