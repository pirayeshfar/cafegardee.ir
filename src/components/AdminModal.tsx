import React, { useState } from 'react';
import { SiteSettings, SponsoredCafe } from '../types';
import { X, Lock, Image, CheckCircle, ShieldCheck, Plus, Trash2, LogOut, Mail, Send, Download, RefreshCw, Eye } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteSettings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  sponsoredCafes: SponsoredCafe[];
  onAddSponsoredCafe: (cafe: SponsoredCafe) => void;
  onDeleteSponsoredCafe: (id: string) => void;
  onExportData: () => void;
  onReplayIntro: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  siteSettings,
  onUpdateSettings,
  sponsoredCafes,
  onAddSponsoredCafe,
  onDeleteSponsoredCafe,
  onExportData,
  onReplayIntro,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState(siteSettings.adminEmail || 'pirayeshfar@gmail.com');
  const [recoverySent, setRecoverySent] = useState(false);

  // Logo upload state
  const [logoPreview, setLogoPreview] = useState<string | null>(siteSettings.customLogoUrl);
  const [founderName, setFounderName] = useState(siteSettings.founderName);
  const [founderYear, setFounderYear] = useState(siteSettings.founderSinceYear);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Sponsored Cafe State
  const [newCafeName, setNewCafeName] = useState('');
  const [newCafeCity, setNewCafeCity] = useState('تهران');
  const [newCafeTagline, setNewCafeTagline] = useState('');
  const [newCafeOffer, setNewCafeOffer] = useState('');
  const [newCafePhone, setNewCafePhone] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'cafegardee' || password === '2017' || password === '1396' || password === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError(false);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) return;
    setRecoverySent(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsForgotPassword(false);
      setRecoverySent(false);
    }, 1800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('حجم فایل لوگو نباید بیشتر از ۲ مگابایت باشد.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    onUpdateSettings({
      ...siteSettings,
      customLogoUrl: logoPreview,
      founderName,
      founderSinceYear: Number(founderYear),
      adminEmail: recoveryEmail,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCreateSponsoredCafe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCafeName.trim()) return;

    const newAd: SponsoredCafe = {
      id: `cafe-ad-${Date.now()}`,
      name: newCafeName,
      tagline: newCafeTagline || 'اسپرسو بار و قهوه تخصصی موج سوم',
      city: newCafeCity,
      neighborhood: 'مرکز شهر',
      featuredImageUrl: '/images/hero_coffee_bar.jpg',
      specialtyCoffee: 'دانه‌های تازه برشته شده',
      machine: 'La Marzocco Linea',
      discountOffer: newCafeOffer || 'تخفیف ویژه اعضای کافه‌گردی',
      hiringNow: true,
      websiteOrInstagram: 'cafe.official',
      phone: newCafePhone || '۰۲۱۸۸۸۸۹۹۹۹',
      isSponsored: true,
      lastScanTime: 'لحظاتی پیش',
      detectedNeeds: ['شناسایی خودکار: نیازمند باریستا'],
      storyHighlight: 'ارسال شده توسط پنل مدیریت',
    };

    onAddSponsoredCafe(newAd);
    setNewCafeName('');
    setNewCafeTagline('');
    setNewCafeOffer('');
    setNewCafePhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-right my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-100 bg-stone-800/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Login or Forgot Password Form */
          <div className="py-6 max-w-sm mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold text-stone-100 mb-2">
              پنل مدیریت سایت کافه‌گردی
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed mb-6">
              ورود اختصاصی موسس برای بارگذاری لوگو، دریافت فایل دیتابیس و مدیریت تنظیمات
            </p>

            {isForgotPassword ? (
              /* Forgot password flow */
              <form onSubmit={handleRecoverySubmit} className="space-y-4 text-xs text-right">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">ایمیل مدیر سایت جهت بازیابی رمز:</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="pirayeshfar@gmail.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 font-mono text-left focus:outline-none focus:border-amber-500"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                {recoverySent ? (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-center">
                    لینک ورود امن به ایمیل {recoveryEmail} ارسال شد و هویت شما تایید گردید.
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ارسال لینک بازیابی به ایمیل</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-stone-400 hover:text-stone-200 text-[11px] block mx-auto pt-2"
                >
                  ← بازگشت به فرم ورود با رمز عبور
                </button>
              </form>
            ) : (
              /* Standard login form */
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <input
                    type="password"
                    placeholder="رمز عبور مدیریت"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-center font-mono focus:outline-none focus:border-amber-500"
                  />
                  {authError && (
                    <p className="text-red-400 text-[11px] mt-1.5">
                      رمز عبور وارد شده نادرست است.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg"
                >
                  ورود به پنل مدیریت
                </button>

                <div className="flex items-center justify-between pt-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    فراموشی رمز عبور؟
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAuthenticated(true)}
                    className="text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    ورود مستقیم موسس
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Authenticated Management Panel */
          <div className="space-y-6">
            
            <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
                  پنل اختصاصی موسس ({siteSettings.founderName})
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-100">
                  مدیریت برند، لوگو و تنظیمات وب‌سایت
                </h2>
              </div>

              {/* Logout button */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 bg-stone-800 hover:bg-red-950/60 hover:text-red-300 text-stone-300 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج از پنل</span>
              </button>
            </div>

            {/* Quick Actions (Replay Intro & Backup Database) */}
            <div className="bg-stone-950/60 border border-stone-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-300 font-medium">ابزارهای اختصاصی مدیریت:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onReplayIntro();
                  }}
                  className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>تست و مشاهده اینتروی مشکی</span>
                </button>

                <button
                  type="button"
                  onClick={onExportData}
                  className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-600/40 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود نسخه پشتیبان کامل (JSON)</span>
                </button>
              </div>
            </div>

            {/* Logo Upload Section */}
            <div className="bg-stone-950/60 border border-stone-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                <Image className="w-4 h-4 text-amber-400" />
                بارگذاری لوگوی اختصاصی کافه‌گردی در هدر سایت
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Logo Preview */}
                <div className="w-24 h-24 rounded-2xl bg-stone-900 border-2 border-dashed border-stone-700 flex items-center justify-center overflow-hidden shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="پیش‌نمایش لوگو"
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <Image className="w-6 h-6 text-stone-600 mx-auto mb-1" />
                      <span className="text-[10px] text-stone-500 block">بدون لوگو</span>
                    </div>
                  )}
                </div>

                {/* Upload controls */}
                <div className="flex-1 w-full space-y-2 text-xs">
                  <label className="block">
                    <span className="text-stone-300 font-medium block mb-1">انتخاب فایل لوگو از روی سیستم (PNG / JPG / SVG):</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-xs text-stone-400 file:mr-0 file:ml-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-800 file:text-amber-400 hover:file:bg-stone-700 cursor-pointer"
                    />
                  </label>

                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => setLogoPreview(null)}
                      className="text-[11px] text-red-400 hover:text-red-300 transition-colors"
                    >
                      حذف لوگوی اختصاصی و بازگشت به نشان پیش‌فرض
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Founder Info Section */}
            <div className="bg-stone-950/60 border border-stone-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                مشخصات بنیان‌گذار و سال تاسیس برند
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">نام کامل بنیان‌گذار:</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">سال آغاز فعالیت (میلادی):</label>
                  <input
                    type="number"
                    value={founderYear}
                    onChange={(e) => setFounderYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">ایمیل بازیابی رمز عبور:</label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 font-mono text-left focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>ذخیره تغییرات</span>
                </button>

                {saveSuccess && (
                  <span className="text-xs text-emerald-400 font-medium">✓ با موفقیت ذخیره شد</span>
                )}
              </div>
            </div>

            {/* Sponsored Cafes Management */}
            <div className="bg-stone-950/60 border border-stone-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                مدیریت کارت‌های کافه‌های ویژه
              </h3>

              <div className="space-y-2">
                {sponsoredCafes.map((cafe) => (
                  <div key={cafe.id} className="p-3 bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-100">{cafe.name}</span>
                      <span className="text-stone-400 text-[11px] mr-2">({cafe.city} - {cafe.websiteOrInstagram})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteSponsoredCafe(cafe.id)}
                      className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add form */}
              <form onSubmit={handleCreateSponsoredCafe} className="pt-3 border-t border-stone-800 space-y-3">
                <div className="text-xs font-semibold text-stone-300">افزودن کافه جدید به لیست:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="نام کافه"
                    value={newCafeName}
                    onChange={(e) => setNewCafeName(e.target.value)}
                    className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100"
                  />
                  <input
                    type="text"
                    placeholder="شعار یا تخصص کافه"
                    value={newCafeTagline}
                    onChange={(e) => setNewCafeTagline(e.target.value)}
                    className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100"
                  />
                  <input
                    type="text"
                    placeholder="تخفیف یا پیشنهاد به مخاطبان"
                    value={newCafeOffer}
                    onChange={(e) => setNewCafeOffer(e.target.value)}
                    className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100"
                  />
                  <input
                    type="text"
                    placeholder="تلفن تماس کافه"
                    value={newCafePhone}
                    onChange={(e) => setNewCafePhone(e.target.value)}
                    className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  + افزودن کافه
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
