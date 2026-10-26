import React, { useState } from 'react';
import { Barista, DirectOffer, JobApplication } from '../types';
import { X, User, Bell, Briefcase, Phone, Send, CheckCircle2, Edit3, Share2, LogOut, Coffee, ArrowRight, Check, Eye } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface BaristaDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBarista: Barista | null;
  onLogin: (phone: string) => boolean;
  onLogout: () => void;
  onUpdateBarista: (updated: Barista) => void;
  offers: DirectOffer[];
  applications: JobApplication[];
  onOpenRegister: () => void;
}

export const BaristaDashboardModal: React.FC<BaristaDashboardModalProps> = ({
  isOpen,
  onClose,
  currentBarista,
  onLogin,
  onLogout,
  onUpdateBarista,
  offers,
  applications,
  onOpenRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'offers' | 'applications' | 'edit' | 'share'>('offers');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Edit form state
  const [name, setName] = useState(currentBarista?.name || '');
  const [roleTitle, setRoleTitle] = useState(currentBarista?.roleTitle || '');
  const [city, setCity] = useState(currentBarista?.city || '');
  const [neighborhood, setNeighborhood] = useState(currentBarista?.neighborhood || '');
  const [bio, setBio] = useState(currentBarista?.bio || '');
  const [phone, setPhone] = useState(currentBarista?.phone || '');
  const [telegram, setTelegram] = useState(currentBarista?.telegram || '');
  const [availability, setAvailability] = useState(currentBarista?.availability || 'fulltime');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state if currentBarista changes
  React.useEffect(() => {
    if (currentBarista) {
      setName(currentBarista.name);
      setRoleTitle(currentBarista.roleTitle);
      setCity(currentBarista.city);
      setNeighborhood(currentBarista.neighborhood);
      setBio(currentBarista.bio);
      setPhone(currentBarista.phone);
      setTelegram(currentBarista.telegram || '');
      setAvailability(currentBarista.availability);
    }
  }, [currentBarista]);

  if (!isOpen) return null;

  // Filter offers specific to this barista
  const myOffers = currentBarista
    ? offers.filter(
        (o) =>
          o.baristaId === currentBarista.id ||
          o.baristaName.trim() === currentBarista.name.trim() ||
          (o.senderPhone && currentBarista.phone.includes(o.senderPhone))
      )
    : [];

  // Filter applications sent by this barista
  const myApplications = currentBarista
    ? applications.filter(
        (a) =>
          a.baristaPhone.trim() === currentBarista.phone.trim() ||
          a.baristaName.trim() === currentBarista.name.trim()
      )
    : [];

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim()) return;
    const success = onLogin(loginPhone.trim());
    if (success) {
      setLoginError(null);
    } else {
      setLoginError('باریستایی با این شماره تماس یافت نشد. می‌توانید به عنوان باریستای جدید ثبت نام فرمایید.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBarista) return;

    const updated: Barista = {
      ...currentBarista,
      name,
      roleTitle,
      city,
      neighborhood,
      bio,
      phone,
      telegram,
      availability,
    };

    onUpdateBarista(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCopyProfileLink = () => {
    if (!currentBarista) return;
    const url = `https://cafegardee.ir/b/${currentBarista.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-right my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-100 bg-stone-800/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!currentBarista ? (
          /* Phone Login View */
          <div className="py-8 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-stone-100 mb-2">
                ورود به پنل و پروفایل باریستا
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed max-w-sm mx-auto font-light">
                شماره موبایلی را که هنگام ثبت نام وارد کرده‌اید تایپ کنید تا به پیام‌ها، پیشنهادهای استخدامی کافه‌ها و ویرایش رزومه دسترسی پیدا کنید.
              </p>
            </div>

            <form onSubmit={handlePhoneLogin} className="space-y-4 text-xs">
              <div>
                <input
                  type="tel"
                  required
                  placeholder="شماره موبایل ثبت شده (مثال: ۰۹۱۲...)"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-center font-mono text-sm focus:outline-none focus:border-amber-500"
                />
                {loginError && (
                  <p className="text-red-400 text-[11px] mt-2 leading-relaxed">
                    {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg text-xs"
              >
                ورود به حساب کاربری من
              </button>

              <div className="pt-4 border-t border-stone-800 text-stone-400 text-xs">
                هنوز در کافه‌گردی پروفایل ندارید؟{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  ثبت نام رایگان باریستا
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Barista Dashboard View */
          <div className="space-y-6">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-800 border-2 border-stone-700 shrink-0">
                  <img
                    src={currentBarista.avatarUrl}
                    alt={currentBarista.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-stone-100">
                      میز کار {currentBarista.name}
                    </h2>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full font-bold">
                      آنلاین
                    </span>
                  </div>
                  <p className="text-xs text-amber-500 font-medium mt-0.5">
                    {currentBarista.roleTitle} · {currentBarista.city}
                  </p>
                  <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                    شماره تماس شما: {toPersianDigits(currentBarista.phone)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 bg-stone-800 hover:bg-red-950/50 hover:text-red-300 text-stone-300 border border-stone-700 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج از حساب</span>
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('offers')}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'offers'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>پیشنهادهای کاری کافه‌ها</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'offers' ? 'bg-stone-900 text-amber-400' : 'bg-amber-950 text-amber-300'}`}>
                  {toPersianDigits(myOffers.length)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('applications')}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'applications'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>درخواست‌های ارسالی من</span>
                <span className="text-[10px] bg-stone-800 px-1.5 py-0.2 rounded-full font-mono text-stone-300">
                  {toPersianDigits(myApplications.length)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'edit'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>ویرایش رزومه و اطلاعات</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('share')}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'share'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>لینک رزومه دیجیتال</span>
              </button>
            </div>

            {/* TAB 1: INCOMING OFFERS FROM CAFES */}
            {activeTab === 'offers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>پیشنهادهای استخدامی مستقیمی که مدیران کافه‌ها برای شما ارسال کرده‌اند:</span>
                  <span className="font-mono text-amber-400">{toPersianDigits(myOffers.length)} پیام دریافتی</span>
                </div>

                {myOffers.length > 0 ? (
                  <div className="space-y-3">
                    {myOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className="bg-stone-950/80 border border-stone-800 hover:border-amber-600/40 p-4 rounded-2xl space-y-3 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-900 pb-2.5">
                          <div>
                            <div className="text-sm font-bold text-stone-100 flex items-center gap-2">
                              <Coffee className="w-4 h-4 text-amber-500" />
                              <span>{offer.cafeName}</span>
                            </div>
                            <span className="text-[11px] text-stone-400 font-mono mt-0.5 block">
                              تاریخ ارسال: {offer.submittedAt}
                            </span>
                          </div>

                          <div className="bg-amber-950/40 border border-amber-900/50 px-2.5 py-1 rounded-lg text-xs text-amber-300 font-bold self-start sm:self-auto">
                            حقوق پیشنهادی: {offer.proposedSalary}
                          </div>
                        </div>

                        <div className="text-xs text-stone-300 leading-relaxed font-light">
                          <strong className="font-medium text-stone-400 block mb-1">پیام و شرایط کارفرما:</strong>
                          {offer.offerDetails}
                        </div>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <a
                            href={`tel:${offer.senderPhone}`}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>تماس با مدیر کافه ({toPersianDigits(offer.senderPhone)})</span>
                          </a>

                          <span className="text-[11px] text-stone-500">
                            شماره تماس مستقیم کارفرما برای هماهنگی مصاحبه حضوری
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-stone-950/40 border border-stone-800 rounded-2xl p-8 text-center space-y-3">
                    <Coffee className="w-8 h-8 text-stone-600 mx-auto" />
                    <h4 className="text-sm font-bold text-stone-300">
                      هنوز پیشنهاد مستقیم جدیدی دریافت نکرده‌اید
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-sm mx-auto font-light">
                      کافه‌ها پس از مشاهده رزومه و دستگاه‌های مسلط شما در صفحه اصلی، مستقیماً با شما تماس گرفته یا در این بخش پیشنهاد همکاری می‌فرستند.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MY SENT APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="text-xs text-stone-400">
                  درخواست‌های استخدامی که شما برای موقعیت‌های شغلی کافه‌ها ارسال کرده‌اید:
                </div>

                {myApplications.length > 0 ? (
                  <div className="space-y-3">
                    {myApplications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-stone-950/80 border border-stone-800 p-4 rounded-2xl space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-100 text-sm">{app.jobTitle}</span>
                          <span className="text-stone-500 font-mono text-[11px]">{app.submittedAt}</span>
                        </div>
                        <div className="text-amber-400 font-medium">کافه: {app.cafeName}</div>
                        <p className="text-stone-300 text-xs font-light">پیام ارسالی شما: {app.message}</p>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>درخواست با موفقیت به دست مدیریت کافه رسیده است</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-stone-950/40 border border-stone-800 rounded-2xl p-8 text-center space-y-3">
                    <Briefcase className="w-8 h-8 text-stone-600 mx-auto" />
                    <h4 className="text-sm font-bold text-stone-300">
                      هنوز برای هیچ آگهی استخدامی درخواست ارسال نکرده‌اید
                    </h4>
                    <p className="text-xs text-stone-400">
                      به بخش «فرصت‌های استخدامی» بروید و مستقیماً برای کافه‌های محبوب خود رزومه بفرستید.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: EDIT PROFILE */}
            {activeTab === 'edit' && (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">عنوان تخصصی:</label>
                    <input
                      type="text"
                      required
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شهر:</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">منطقه / محله:</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">وضعیت همکاری:</label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 cursor-pointer"
                    >
                      <option value="fulltime">آماده به کار تمام وقت</option>
                      <option value="parttime">آماده به کار پاره وقت</option>
                      <option value="shift">شیفت عصر / چرخشی</option>
                      <option value="consulting">مشاوره و راه‌اندازی</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شماره تماس مستقیم:</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">آیدی تلگرام:</label>
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 font-mono text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">بیوگرافی و سبک کاری:</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    ذخیره تغییرات رزومه
                  </button>

                  {saveSuccess && (
                    <span className="text-xs text-emerald-400 font-medium">✓ تغییرات با موفقیت ذخیره شد</span>
                  )}
                </div>
              </form>
            )}

            {/* TAB 4: SHAREABLE DIGITAL RESUME */}
            {activeTab === 'share' && (
              <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                  <Share2 className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-stone-100">
                    کارت ویزیت دیجیتال باریستا
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto leading-relaxed">
                    این لینک را می‌توانید در بایوی اینستاگرام یا رزومه خود قرار دهید تا کافه‌ها پورتفولیو و سوابق تایید شده شما را مشاهده نمایند:
                  </p>
                </div>

                <div className="bg-stone-900 border border-stone-700 p-3 rounded-xl flex items-center justify-between max-w-md mx-auto text-xs font-mono">
                  <span className="text-amber-400 truncate">
                    cafegardee.ir/b/{currentBarista.id}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyProfileLink}
                    className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-sans transition-colors cursor-pointer shrink-0 mr-2 flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                    <span>{copiedLink ? 'کپی شد' : 'کپی لینک'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
