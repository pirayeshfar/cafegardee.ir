import React, { useState } from 'react';
import { X, Heart, Coffee, CheckCircle2, Shield, ExternalLink, Sparkles } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationSuccess?: (donorName: string, amount: number) => void;
}

export const HAMIBASH_URL = 'https://hamibash.com/cafegardee';

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onDonationSuccess,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOpenHamibashDirect = () => {
    window.open(HAMIBASH_URL, '_blank', 'noopener,noreferrer');
    if (onDonationSuccess) {
      onDonationSuccess(donorName || 'حامی کافه‌گردی', selectedAmount);
    }
  };

  const handleSimulateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (onDonationSuccess) {
        onDonationSuccess(donorName || 'حامی کافه‌گردی', selectedAmount);
      }
      setTimeout(() => {
        setIsSuccess(false);
        // Open the user's real Hamibash page
        window.open(HAMIBASH_URL, '_blank', 'noopener,noreferrer');
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-right my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-100 bg-stone-800/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-stone-100">
              از حمایت و همراهی شما بسیار سپاسگزاریم!
            </h3>
            <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
              در حال انتقال به صفحه رسمی حامی‌باش کافه‌گردی جهت تکمیل پرداخت امن...
            </p>
          </div>
        ) : (
          <div>
            
            {/* Header */}
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Coffee className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-100 mb-2">
                حمایت مالی و خرید قهوه برای کافه‌گردی
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                تمامی خدمات کافه‌گردی پرو برای باریستاها و کارفرمایان <strong className="text-amber-400 font-bold">۱۰۰٪ رایگان</strong> است. شما می‌توانید با خرید یک یا چند فنجان قهوه، به تداوم و پرداخت هزینه‌های سرور این بستر کمک فرمایید.
              </p>
            </div>

            {/* Direct Hamibash Verified Box */}
            <div className="mb-6 p-4 bg-gradient-to-l from-rose-950/40 to-stone-950 border border-rose-900/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
                    <span>صفحه رسمی حامی‌باش کافه‌گردی</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-700/50">تایید شده</span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                    hamibash.com/cafegardee
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenHamibashDirect}
                className="w-full sm:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-rose-950/40"
              >
                <span>ورود مستقیم به حامی‌باش</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Donation Amount Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {[
                { amount: 50000, label: '۱ فنجان اسپرسو', cups: '☕' },
                { amount: 100000, label: '۲ فنجان لاته', cups: '☕☕' },
                { amount: 250000, label: 'یک بسته دانه تخصصی', cups: '🫘' },
                { amount: 500000, label: 'حامی طلایی جامعه', cups: '⭐' },
              ].map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => setSelectedAmount(tier.amount)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    selectedAmount === tier.amount
                      ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <span className="text-lg mb-1">{tier.cups}</span>
                  <span className="text-xs font-bold font-mono tabular-nums text-stone-100">
                    {toPersianDigits(tier.amount.toLocaleString('en-US'))}
                  </span>
                  <span className="text-[10px] text-stone-400 mt-0.5">تومان</span>
                  <span className="text-[10px] text-amber-400/80 mt-1">{tier.label}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSimulateDonation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">نام یا نام کافه شما (اختیاری):</label>
                  <input
                    type="text"
                    placeholder="مثال: کافه تخصصی / ناشناس"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">پیام همراه حمایت (اختیاری):</label>
                  <input
                    type="text"
                    placeholder="پیام شما در صفحه حامی‌باش..."
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-stone-950" />
                  <span>
                    {isProcessing
                      ? 'در حال اتصال به حامی‌باش...'
                      : `پرداخت و حمایت ${toPersianDigits(selectedAmount.toLocaleString('en-US'))} تومان در حامی‌باش`}
                  </span>
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
