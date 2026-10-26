import React, { useState } from 'react';
import { JobListing, JobApplication } from '../types';
import { X, Send, CheckCircle2, Briefcase } from 'lucide-react';

interface ApplyJobModalProps {
  job: JobListing | null;
  onClose: () => void;
  onSubmitApplication: (application: JobApplication) => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  job,
  onClose,
  onSubmitApplication,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }

    const application: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      cafeName: job.cafeName,
      baristaName: name,
      baristaPhone: phone,
      message: message || 'آماده برای مصاحبه حضوری و تست عملی کالیبراسیون و عصاره‌گیری.',
      submittedAt: new Date().toLocaleDateString('fa-IR'),
    };

    onSubmitApplication(application);
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
            <h3 className="text-lg font-bold text-stone-100">درخواست همکاری با موفقیت ثبت شد</h3>
            <p className="text-xs text-stone-300 leading-relaxed max-w-xs mx-auto">
              اطلاعات شما برای مدیریت {job.cafeName} ارسال شد و جهت هماهنگی جلسه حضوری با شما تماس گرفته خواهد شد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
                ارسال درخواست استخدام
              </div>
              <h2 className="text-xl font-bold text-stone-100 mb-1">
                {job.title}
              </h2>
              <p className="text-stone-400">
                {job.cafeName} · {job.city} ({job.neighborhood})
              </p>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">نام و نام خانوادگی شما *</label>
              <input
                type="text"
                required
                placeholder="مثال: آرمان سلیمانی"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">شماره تماس جهت هماهنگی *</label>
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
              <label className="block text-stone-300 font-medium mb-1">خلاصه تجربیات، دستگاه‌های مسلط و پیام شما به کافه</label>
              <textarea
                rows={3}
                placeholder="سوابق کاری، تسلط به دستگاه‌های مورد نیاز این کافه و ساعات آزاد..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال رزومه و درخواست همکاری</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
