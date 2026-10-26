import React, { useState } from 'react';
import { Barista } from '../types';
import { X, CheckCircle, Phone, Send, Award, Wrench, Building2, ThumbsUp, MapPin } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface BaristaModalProps {
  barista: Barista | null;
  onClose: () => void;
  onSendOffer: (barista: Barista) => void;
  onEndorse: (baristaId: string) => void;
}

export const BaristaModal: React.FC<BaristaModalProps> = ({
  barista,
  onClose,
  onSendOffer,
  onEndorse,
}) => {
  const [endorsed, setEndorsed] = useState(false);

  if (!barista) return null;

  const handleEndorseClick = () => {
    if (!endorsed) {
      onEndorse(barista.id);
      setEndorsed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-right my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-100 bg-stone-800/60 rounded-full transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-stone-800">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-800 border-2 border-stone-700">
              <img
                src={barista.avatarUrl}
                alt={barista.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {barista.verified && (
              <div 
                title="تایید شده توسط کافه‌گردی" 
                className="absolute -bottom-1 -left-1 bg-amber-500 text-stone-950 p-1 rounded-full shadow"
              >
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-100">
                {barista.name}
              </h2>
              {barista.verified && (
                <span className="text-xs text-amber-400 font-medium bg-amber-950/50 border border-amber-800/50 px-2 py-0.5 rounded-md">
                  باریستای احراز هویت شده
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-amber-500 mt-1">
              {barista.roleTitle}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-2 font-light">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                {barista.city} ({barista.neighborhood})
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="tabular-nums font-mono">{toPersianDigits(barista.experienceYears)} سال سابقه</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="font-mono text-amber-400">{toPersianDigits(barista.rating)} امتیاز</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="py-5 border-b border-stone-800">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            درباره و سبک کاری
          </h4>
          <p className="text-sm text-stone-200 leading-relaxed font-light">
            {barista.bio}
          </p>
        </div>

        {/* Technical Skills & Mastered Machines */}
        <div className="py-5 border-b border-stone-800 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>تخصص‌ها و مهارت‌های فنی بار:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {barista.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs text-stone-200 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>دستگاه‌ها و آسیاب‌های تحت تسلط:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {barista.machines.map((machine, index) => (
                <span
                  key={index}
                  className="text-xs font-mono text-amber-300 bg-amber-950/30 border border-amber-900/40 px-3 py-1 rounded-lg"
                >
                  {machine}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience Timeline & Previous Cafes */}
        <div className="py-5 border-b border-stone-800">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>سوابق کاری در کافه‌های پیشین:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {barista.previousCafes.map((cafe, index) => (
              <div 
                key={index}
                className="bg-stone-950/60 border border-stone-800/80 p-2.5 rounded-xl text-xs text-stone-300 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                <span>{cafe}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {barista.certifications.length > 0 && (
          <div className="py-5 border-b border-stone-800">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>مدارک و افتخارات:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {barista.certifications.map((cert, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Endorsements & Social Proof */}
        <div className="py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400">
            تایید مهارت توسط همکاران و کافه‌داران: <span className="font-mono font-bold text-stone-200 tabular-nums">{toPersianDigits(barista.endorsementsCount + (endorsed ? 1 : 0))} نفر</span>
          </div>
          <button
            onClick={handleEndorseClick}
            disabled={endorsed}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              endorsed
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{endorsed ? 'مهارت تایید شد' : '+ تایید تخصص'}</span>
          </button>
        </div>

        {/* 100% Free Direct Contact Action Bar */}
        <div className="pt-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`tel:${barista.phone}`}
              className="w-full sm:flex-1 py-3 px-4 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>تماس مستقیم تلفنی ({toPersianDigits(barista.phone)})</span>
            </a>

            {barista.telegram && (
              <a
                href={`https://t.me/${barista.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-4 bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/60 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام تلگرام</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onSendOffer(barista);
            }}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-950/40"
          >
            <Send className="w-4 h-4" />
            <span>ارسال پیشنهاد کار رسمی به این باریستا</span>
          </button>
        </div>

      </div>
    </div>
  );
};
