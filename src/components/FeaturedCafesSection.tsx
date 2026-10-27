import React, { useState } from 'react';
import { SponsoredCafe } from '../types';
import { Coffee, MapPin, Sparkles, Phone, ExternalLink, Tag, RefreshCw, Cpu, CheckCircle2, Instagram, Search, Globe, Clock, DollarSign, Wrench, Flame, Copy, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';
import { analyzeCafeTarget, CafeAnalysisResult } from '../utils/cafeAnalyzer';

interface FeaturedCafesSectionProps {
  cafes: SponsoredCafe[];
  onOpenRegisterCafe: () => void;
  onUpdateCafeNeeds?: (cafeId: string, updatedCafe: Partial<SponsoredCafe>) => void;
  onPrefillJob?: (data: { cafeName: string; city: string; title: string; machines: string; description: string }) => void;
}

export const FeaturedCafesSection: React.FC<FeaturedCafesSectionProps> = ({
  cafes,
  onOpenRegisterCafe,
  onUpdateCafeNeeds,
  onPrefillJob,
}) => {
  const [scanningCafeId, setScanningCafeId] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [analyzingCustom, setAnalyzingCustom] = useState(false);
  const [customAnalysisResult, setCustomAnalysisResult] = useState<CafeAnalysisResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick sample chips for instant user testing
  const SAMPLE_TARGETS = [
    { label: 'کافه نادری (اینستاگرام)', value: 'original_cafe_naderi' },
    { label: 'سایت کافه نادری', value: 'https://cafenaderi.com' },
    { label: 'سام کافه', value: 'sam.cafe' },
    { label: 'روستر هد شیراز', value: 'headroaster.shiraz' },
    { label: 'کافه لمیز', value: 'lamizcoffee.com' },
  ];

  // Live intelligent scan of individual sponsored cafe
  const handleSmartScan = async (cafe: SponsoredCafe) => {
    setScanningCafeId(cafe.id);
    try {
      const result = await analyzeCafeTarget(cafe.websiteOrInstagram || cafe.name);
      setTimeout(() => {
        setScanningCafeId(null);
        if (onUpdateCafeNeeds) {
          onUpdateCafeNeeds(cafe.id, {
            detectedNeeds: result.detectedNeeds,
            storyHighlight: result.storyHighlight,
            lastScanTime: 'همین الان (زنده)',
            hiringNow: result.status !== 'crew_full',
          });
        }
      }, 1000);
    } catch {
      setScanningCafeId(null);
    }
  };

  // Analyze any Instagram page or cafe website dynamically
  const handleAnalyzeTarget = async (e?: React.FormEvent, directValue?: string) => {
    if (e) e.preventDefault();
    const target = directValue !== undefined ? directValue : customInput;
    if (!target.trim()) {
      setErrorMsg('لطفاً آیدی اینستاگرام یا آدرس وب‌سایت کافه را وارد فرمایید.');
      return;
    }

    setErrorMsg(null);
    setAnalyzingCustom(true);
    setCustomAnalysisResult(null);

    try {
      const result = await analyzeCafeTarget(target.trim());
      // Slight delay for realistic scan feel
      setTimeout(() => {
        setCustomAnalysisResult(result);
        setAnalyzingCustom(false);
      }, 900);
    } catch (err: any) {
      setAnalyzingCustom(false);
      setErrorMsg(err?.message || 'خطا در تحلیل اطلاعات کافه.');
    }
  };

  const handleCopySummary = () => {
    if (!customAnalysisResult) return;
    const text = `تحلیل هوشمند کافه‌گردی برای ${customAnalysisResult.cafeName}:
موقعیت استخدامی: ${customAnalysisResult.statusText}
دستگاه‌ها: ${customAnalysisResult.detectedMachines.join('، ')}
نیازهای اعلام شده:
${customAnalysisResult.detectedNeeds.map((n) => `• ${n}`).join('\n')}
${customAnalysisResult.storyHighlight}
منبع: کافه‌گردی پرو (cafegardee.ir)`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>سیستم هوشمند پایش استوری، پیج و وب‌سایت کافه‌ها</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            کافه‌های ویژه و تحلیل لحظه‌ای نیازهای بار
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            با وارد کردن آیدی اینستاگرام یا آدرس سایت هر کافه در ایران، سیستم هوشمند نیازمندی‌های بار، دستگاه‌ها و استوری‌های استخدامی آن را استخراج می‌نماید.
          </p>
        </div>

        <button
          onClick={onOpenRegisterCafe}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer shadow-md"
        >
          <Coffee className="w-4 h-4" />
          <span>ثبت رایگان آگهی استخدام کافه</span>
        </button>
      </div>

      {/* Smart Instagram & Website Scanner Tool Banner */}
      <div className="bg-stone-900/90 border border-amber-600/30 rounded-3xl p-5 sm:p-7 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl mb-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-1">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>آنالایزر هوشمند استوری، پیج و وب‌سایت کافه (Cafe Story & Needs Detector)</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed font-light">
            آیدی اینستاگرام (مانند <span className="font-mono text-amber-300">@original_cafe_naderi</span>) یا آدرس سایت کافه (مانند <span className="font-mono text-amber-300">cafenaderi.com</span> یا <span className="font-mono text-amber-300">sam.cafe</span>) را وارد کنید تا هوش مصنوعی آخرین نیازمندی‌ها، متدهای عصاره‌گیری و استوری‌های استخدامی آن را تحلیل کند:
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => handleAnalyzeTarget(e)} className="flex flex-col sm:flex-row gap-2.5 mb-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="مثال: original_cafe_naderi یا sam.cafe یا https://cafenaderi.com"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              className="w-full pl-4 pr-10 py-3 bg-stone-950 border border-stone-700 rounded-2xl text-stone-100 text-xs font-mono placeholder-stone-500 focus:outline-none focus:border-amber-500 text-left transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500">
              {customInput.includes('http') || customInput.includes('.com') || customInput.includes('.ir') ? (
                <Globe className="w-4 h-4 text-amber-400" />
              ) : (
                <Instagram className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={analyzingCustom}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer shadow-lg disabled:opacity-60"
          >
            <Search className={`w-4 h-4 ${analyzingCustom ? 'animate-spin' : ''}`} />
            <span>{analyzingCustom ? 'در حال پایش و تحلیل هوشمند...' : 'آنالیز استوری و سایت'}</span>
          </button>
        </form>

        {/* Error message */}
        {errorMsg && (
          <div className="text-xs text-red-400 flex items-center gap-1.5 mb-3 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Sample Test Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-stone-400">
          <span className="text-stone-500">تست سریع با نمونه‌های واقعی:</span>
          {SAMPLE_TARGETS.map((sample) => (
            <button
              key={sample.value}
              type="button"
              onClick={() => {
                setCustomInput(sample.value);
                handleAnalyzeTarget(undefined, sample.value);
              }}
              className="px-2.5 py-1 bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-600/40 rounded-lg transition-colors cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Real Dynamic Analysis Result Card */}
        {customAnalysisResult && (
          <div className="mt-6 pt-6 border-t border-stone-800 animate-in fade-in duration-300 bg-stone-950/80 border border-stone-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
            
            {/* Top Bar of Result */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  {customAnalysisResult.type === 'website' ? (
                    <Globe className="w-6 h-6" />
                  ) : (
                    <Instagram className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-stone-100">
                      {customAnalysisResult.cafeName}
                    </h3>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-700/50 px-2 py-0.5 rounded-full font-bold">
                      {customAnalysisResult.statusText}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-1 font-mono">
                    <span>
                      {customAnalysisResult.type === 'website' ? 'وب‌سایت:' : 'پیج اینستاگرام:'} @{customAnalysisResult.handleOrDomain}
                    </span>
                    <span>·</span>
                    <span className="text-amber-400 font-sans">{customAnalysisResult.category}</span>
                    <span>·</span>
                    <span className="text-stone-300 font-sans flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {customAnalysisResult.cityGuess}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                <span className="text-stone-400 flex items-center gap-1 text-[11px] font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {customAnalysisResult.sourceTimestamp}
                </span>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'کپی شد' : 'کپی تحلیل'}</span>
                </button>
              </div>
            </div>

            {/* Story / Post Live Quote */}
            <div className="bg-amber-950/30 border border-amber-600/30 p-3.5 rounded-xl text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">محتوای زنده استخراج شده از رسانه کافه:</span>
                <p className="font-light">{customAnalysisResult.storyHighlight}</p>
              </div>
            </div>

            {/* 3 Extracted Needs List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>نیازمندی‌های استخدامی و تخصصی شناسایی‌شده:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {customAnalysisResult.detectedNeeds.map((need, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-900/90 border border-stone-800 rounded-xl text-xs text-stone-200 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-amber-500 font-bold mt-0.5 shrink-0">#{toPersianDigits(idx + 1)}</span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Gear & Compensation Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
                <span className="text-stone-400 block text-[11px] mb-1 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-amber-400" />
                  دستگاه و آسیاب بار:
                </span>
                <span className="font-mono text-stone-200 text-xs">
                  {customAnalysisResult.detectedMachines.join(' · ')}
                </span>
              </div>

              <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
                <span className="text-stone-400 block text-[11px] mb-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" />
                  حقوق و مزایای پیشنهادی:
                </span>
                <span className="text-stone-200 text-xs font-medium">
                  {customAnalysisResult.salaryEstimate}
                </span>
              </div>

              <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
                <span className="text-stone-400 block text-[11px] mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  شیفت کاری:
                </span>
                <span className="text-stone-200 text-xs">
                  {customAnalysisResult.shifts}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {customAnalysisResult.type === 'website' ? (
                  <a
                    href={customAnalysisResult.contactInfo.websiteUrl || `https://${customAnalysisResult.handleOrDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>باز کردن وب‌سایت کافه</span>
                  </a>
                ) : (
                  <a
                    href={`https://instagram.com/${customAnalysisResult.handleOrDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>مشاهده پیج در اینستاگرام</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onOpenRegisterCafe}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>ثبت رسمی این موقعیت استخدامی در کافه‌گردی</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
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
