import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Sparkles, Shield, Coffee, Zap } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateSubscription: () => void;
  isUnlockedVip: boolean;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onActivateSubscription,
  isUnlockedVip,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'silver' | 'gold' | 'annual'>('gold');
  const [isProcessing, setIsProcessing] = useState(false);
  const [justActivated, setJustActivated] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setJustActivated(true);
      onActivateSubscription();
      setTimeout(() => {
        setJustActivated(false);
        onClose();
      }, 1800);
    }, 1200);
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

        {justActivated ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-950/60">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-stone-100">
              اشتراک VIP کارفرمایی با موفقیت فعال شد!
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto">
              تمام شماره‌های تماس، آیدی‌های تلگرام و راه‌های ارتباطی مستقیم باریستاها برای شما بازگشایی شد.
            </p>
          </div>
        ) : (
          <div>
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-100 mb-2">
                دسترسی به شماره تماس و استخدام مستقیم باریستاها
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                برای حفظ حریم خصوصی متخصصان و تضمین کیفیت ارتباطات کارفرمایی، دسترسی کامل به اطلاعات تماس مستلزم تهیه اشتراک کارفرمایی کافه‌گردی پرو است.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              
              {/* Plan 1: Silver */}
              <div
                onClick={() => setSelectedPlan('silver')}
                className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'silver'
                    ? 'bg-stone-950 border-amber-500 shadow-xl shadow-amber-950/20'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-stone-400 mb-1">اشتراک نقره‌ای</div>
                  <h3 className="text-lg font-bold text-stone-100 mb-3">۱ ماهه استخدامی</h3>
                  
                  <div className="text-2xl font-black font-mono text-stone-100 mb-4 tabular-nums">
                    ۴۹۰,۰۰۰ <span className="text-xs text-stone-400 font-normal">تومان</span>
                  </div>

                  <ul className="space-y-2 text-xs text-stone-300">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span>دسترسی به شماره تماس تمام باریستاها</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span>ارسال ۱ آگهی استخدام در تابلوی شغلی</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span>پشتیبانی پیام‌رسان</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800 text-center">
                  <div className={`text-xs font-bold ${selectedPlan === 'silver' ? 'text-amber-400' : 'text-stone-500'}`}>
                    {selectedPlan === 'silver' ? '● انتخاب شده' : 'انتخاب این طرح'}
                  </div>
                </div>
              </div>

              {/* Plan 2: Gold (Recommended) */}
              <div
                onClick={() => setSelectedPlan('gold')}
                className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'gold'
                    ? 'bg-gradient-to-b from-amber-950/40 to-stone-950 border-amber-500 shadow-2xl shadow-amber-950/40 ring-1 ring-amber-500'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-amber-500 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                  پیشنهاد ویژه کافه‌داران
                </div>

                <div>
                  <div className="text-xs font-bold text-amber-400 mb-1">اشتراک طلایی VIP</div>
                  <h3 className="text-lg font-bold text-stone-100 mb-3">۳ ماهه کامل</h3>
                  
                  <div className="text-2xl font-black font-mono text-amber-400 mb-1 tabular-nums">
                    ۹۸۰,۰۰۰ <span className="text-xs text-stone-400 font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-stone-500 line-through mb-4 tabular-nums">
                    ۱,۴۷۰,۰۰۰ تومان
                  </div>

                  <ul className="space-y-2 text-xs text-stone-200">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>دسترسی نامحدود ۳ ماهه به کل بانک اطلاعاتی</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>۳ آگهی استخدام فوری با اولویت بالا</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>ارسال پیشنهاد کار رسمی مستقیم به باریستا</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>تطبیق هوشمند دستگاه با مهارت فرد</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-amber-900/40 text-center">
                  <div className={`text-xs font-bold ${selectedPlan === 'gold' ? 'text-amber-400' : 'text-stone-500'}`}>
                    {selectedPlan === 'gold' ? '● انتخاب شده' : 'انتخاب این طرح'}
                  </div>
                </div>
              </div>

              {/* Plan 3: Annual VIP */}
              <div
                onClick={() => setSelectedPlan('annual')}
                className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'annual'
                    ? 'bg-stone-950 border-amber-500 shadow-xl shadow-amber-950/20'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-stone-400 mb-1">اشتراک سالانه</div>
                  <h3 className="text-lg font-bold text-stone-100 mb-3">۱۲ ماهه زنجیره‌ای</h3>
                  
                  <div className="text-2xl font-black font-mono text-stone-100 mb-4 tabular-nums">
                    ۲,۴۰۰,۰۰۰ <span className="text-xs text-stone-400 font-normal">تومان</span>
                  </div>

                  <ul className="space-y-2 text-xs text-stone-300">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span>دسترسی نامحدود سالانه به تمام باریستاهای کشور</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span>آگهی‌های استخدامی نامحدود در طول سال</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span>نمایش بنر کافه در بخش کافه‌های ویژه ماه</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800 text-center">
                  <div className={`text-xs font-bold ${selectedPlan === 'annual' ? 'text-amber-400' : 'text-stone-500'}`}>
                    {selectedPlan === 'annual' ? '● انتخاب شده' : 'انتخاب این طرح'}
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="bg-stone-950/80 border border-stone-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>گارانتی بازگشت وجه در صورت عدم رضایت تا ۷ روز</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSimulatePayment}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{isProcessing ? 'در حال فعال‌سازی اشتراک...' : 'فعال‌سازی آنی اشتراک و بازگشایی شماره‌ها'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
