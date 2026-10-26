import React, { useState } from 'react';
import { Barista, DirectOffer } from '../types';
import { X, Send, CheckCircle2, Coffee } from 'lucide-react';

interface SendOfferModalProps {
  barista: Barista | null;
  onClose: () => void;
  onSubmitOffer: (offer: DirectOffer) => void;
}

export const SendOfferModal: React.FC<SendOfferModalProps> = ({
  barista,
  onClose,
  onSubmitOffer,
}) => {
  const [cafeName, setCafeName] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!barista) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cafeName.trim() || !phone.trim()) {
      alert('لطفاً نام کافه و شماره تماس را وارد فرمایید.');
      return;
    }

    const offer: DirectOffer = {
      id: `offer-${Date.now()}`,
      baristaId: barista.id,
      baristaName: barista.name,
      cafeName,
      senderPhone: phone,
      offerDetails: details || 'پیشنهاد مصاحبه و بررسی همکاری در بار تخصصی کافه',
      proposedSalary: salary || 'توافقی بر اساس مهارت',
      submittedAt: new Date().toLocaleDateString('fa-IR'),
    };

    onSubmitOffer(offer);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-100 bg-stone-800/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-100">پیشنهاد همکاری ثبت و ارسال شد</h3>
            <p className="text-xs text-stone-300 leading-relaxed max-w-xs mx-auto">
              پیام همکاری شما برای {barista.name} ثبت شد و باریستا می‌تواند مستقیماً با شماره شما تماس حاصل فرماید.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
                ارسال پیشنهاد استخدام
              </div>
              <h2 className="text-xl font-bold text-stone-100 mb-1">
                پیشنهاد کار به {barista.name}
              </h2>
              <p className="text-stone-400">
                {barista.roleTitle} · {barista.city}
              </p>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">نام کافه شما *</label>
              <input
                type="text"
                required
                placeholder="مثال: کافه تخصصی روستر"
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">شماره تماس مدیر کافه *</label>
                <input
                  type="tel"
                  required
                  placeholder="0912..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-left"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">حقوق پیشنهادی یا توافقی</label>
                <input
                  type="text"
                  placeholder="مثال: ۲۰ تا ۲۵ میلیون"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">توضیحات و شرایط کار</label>
              <textarea
                rows={3}
                placeholder="شیفت مورد نیاز، آدرس دقیق کافه و دستگاه‌های مستقر..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال مستقیم پیشنهاد همکاری</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
