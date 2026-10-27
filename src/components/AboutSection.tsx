import React from 'react';
import { Coffee, Shield, Zap, Award, Heart, CheckCircle2, Users } from 'lucide-react';
import { SiteSettings } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface AboutSectionProps {
  totalBaristas: number;
  totalJobs: number;
  siteSettings: SiteSettings;
  onOpenDonation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  totalBaristas,
  totalJobs,
  siteSettings,
  onOpenDonation,
}) => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Split: Story + Real Macro Latte Art Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        
        <div className="lg:col-span-7">
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>روایت تاسیس و همراهی با جامعه کافه‌های ایران از سال ۱۳۹۶ (۲۰۱۷)</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-100 leading-snug mb-4 [text-wrap:balance]">
            داستان تولد کافه‌گردی؛ از عشق به قهوه تا بزرگ‌ترین مرجع باریستاهای ایران
          </h2>

          <p className="text-sm text-stone-300 leading-relaxed font-light mb-4">
            دامنه <span className="font-mono text-amber-400 font-bold">cafegardee.ir</span> از سال ۱۳۹۶ (۲۰۱۷) با ایده‌پردازی و هدایت <strong className="text-stone-100 font-semibold">{siteSettings.founderName}</strong> متولد شد. این مسیر ابتدا با یک پایگاه خبری و معرفی تخصصی کافه‌ها آغاز گردید؛ اما با تقلیدهای مکرر رقبا و ورود سرمایه‌های تجاری بدون روح، تصمیم گرفتیم ماهیت اصلی برند را به کانون واقعی صنعت قهوه متصل کنیم: <strong>ارزش دادن به هنر دست باریستاها، معرفی نیروهای ماهر و ایجاد سریع‌ترین پل ارتباط کاری بدون واسطه</strong>.
          </p>

          <p className="text-sm text-stone-300 leading-relaxed font-light mb-6">
            امروز کافه‌گردی پرو بستری کاملاً مستقل و رایگان برای متخصصان بار گرم و سرد و مدیران کافه‌هاست تا بدون پرداخت کمیسیون و بدون واسطه به هم متصل شوند.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-stone-900/60 border border-stone-800 p-3.5 rounded-xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-200">سرعت بالا و بدون فیلتر</h4>
                <p className="text-[11px] text-stone-400 mt-1">طراحی مستقل بدون وابستگی به سرویس‌های خارجی و نقشه تحریم‌شده.</p>
              </div>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 p-3.5 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-200">۱۰۰٪ رایگان و مستقیم</h4>
                <p className="text-[11px] text-stone-400 mt-1">ارتباط بدون کارمزد، بدون واسطه و بدون هزینه‌های پنهان.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Macro Latte Art Image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
            <img
              src="/images/latte_art_pour.jpg"
              alt="پور دقیق لاته آرت توسط باریستای حرفه‌ای"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover object-center filter saturate-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 left-4 p-3 bg-stone-900/80 backdrop-blur-md rounded-xl border border-stone-800 text-xs">
              <div className="font-bold text-stone-200">هنر و تخصص عصاره‌گیری قهوه</div>
              <div className="text-[11px] text-stone-400 mt-0.5 font-light">
                هر فنجان قهوه حاصل سال‌ها کالیبراسیون و آموزش پیوسته باریستاست.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3 Pillars of Cafegardee Pro */}
      <div className="mb-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-xl sm:text-2xl font-bold text-stone-100">
            اصول و ارزش‌های بنیادین کافه‌گردی
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            سه ستون اصلی که این پلتفرم را به خانه واقعی فعالان صنعت قهوه ایران تبدیل کرده است
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                ۱
              </div>
              <h4 className="text-base font-bold text-stone-100 mb-2">
                دسترسی کاملاً رایگان برای همه
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                هیچ دیواری بین باریستا و مدیر کافه وجود ندارد. شماره‌ها باز هستند و ثبت رزومه و آگهی کاملاً رایگان است تا جامعه با بیشترین شتاب رشد کند.
              </p>
            </div>

            <button
              onClick={onOpenDonation}
              className="mt-4 text-xs font-semibold text-rose-300 hover:text-rose-200 flex items-center gap-1.5 cursor-pointer pt-3 border-t border-stone-800/80"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>حمایت از ما در حامی‌باش (خرید قهوه)</span>
            </button>
          </div>

          <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                ۲
              </div>
              <h4 className="text-base font-bold text-stone-100 mb-2">
                پایش هوشمند اینستاگرام کافه‌ها
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                سیستم به صورت خودکار نیازهای استخدامی کافه‌ها را از روی استوری‌ها و پست‌های روزانه شناسایی کرده و به صورت لحظه‌ای به باریستاها اعلام می‌کند.
              </p>
            </div>
          </div>

          <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                ۳
              </div>
              <h4 className="text-base font-bold text-stone-100 mb-2">
                اصالت و قدمت از سال ۱۳۹۶ (۲۰۱۷)
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                اعتبار نزدیک به یک دهه فعالیت برند cafegardee.ir در جامعه کافه‌ای ایران با طراحی و ایده‌پردازی امیرسامان پیرایش فر.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
