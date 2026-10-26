import React from 'react';
import { Barista } from '../types';
import { CheckCircle, Phone, Send, Eye, Wrench, Sparkles } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface BaristaCardProps {
  barista: Barista;
  onSelect: (barista: Barista) => void;
  onSendOffer: (barista: Barista) => void;
}

export const BaristaCard: React.FC<BaristaCardProps> = ({
  barista,
  onSelect,
  onSendOffer,
}) => {
  const getAvailabilityLabel = (type: Barista['availability']) => {
    switch (type) {
      case 'fulltime':
        return 'آماده به کار تمام وقت';
      case 'parttime':
        return 'آماده به کار پاره وقت';
      case 'consulting':
        return 'مشاوره و راه‌اندازی';
      case 'shift':
        return 'شیفت عصر / چرخشی';
      default:
        return 'آماده همکاری';
    }
  };

  return (
    <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-5 hover:border-amber-600/50 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-amber-950/20">
      
      <div>
        {/* Top Header: Avatar + Name + Title */}
        <div className="flex items-start gap-4 mb-4">
          
          {/* Avatar with fallback container */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-800 border border-stone-700/80">
              <img
                src={barista.avatarUrl}
                alt={barista.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {barista.verified && (
              <div 
                title="رزومه و سوابق تایید شده در کافه‌گردی" 
                className="absolute -bottom-1.5 -left-1.5 bg-amber-500 text-stone-950 rounded-full p-0.5 shadow-md"
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Info Block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
                {barista.name}
              </h3>
              <div className="text-xs text-amber-500 font-mono font-medium shrink-0 tabular-nums">
                {toPersianDigits(barista.rating)} ★
              </div>
            </div>

            <p className="text-xs text-stone-300 font-medium mt-0.5 line-clamp-1">
              {barista.roleTitle}
            </p>

            {/* Zero-Pill Metadata with typographic separators */}
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-2 font-light">
              <span>{barista.city}</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="tabular-nums font-mono">{toPersianDigits(barista.experienceYears)} سال سابقه</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-amber-400/90">{getAvailabilityLabel(barista.availability)}</span>
            </div>
          </div>

        </div>

        {/* Bio excerpt */}
        <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-4 font-light">
          {barista.bio}
        </p>

        {/* Highlighted Skills - Clean unboxed text list */}
        <div className="mb-4">
          <div className="text-[11px] font-medium text-stone-400 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>مهارت‌های کلیدی:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {barista.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-[11px] text-stone-300 bg-stone-950/70 border border-stone-800/80 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
            {barista.skills.length > 3 && (
              <span className="text-[11px] text-stone-500 py-0.5 px-1 font-mono">
                +{toPersianDigits(barista.skills.length - 3)}
              </span>
            )}
          </div>
        </div>

        {/* Familiar Machines snippet */}
        <div className="mb-4 pt-3 border-t border-stone-800/60">
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <Wrench className="w-3 h-3 text-amber-500" />
            <span className="truncate">
              دستگاه‌های مسلط: <strong className="text-stone-300 font-normal">{barista.machines.slice(0, 2).join('، ')}</strong>
            </span>
          </div>
        </div>

        {/* 100% Free Direct Contact Row */}
        <div className="mb-4 pt-2 pb-1">
          <div className="flex items-center justify-between bg-stone-950/60 border border-stone-800/80 p-2.5 rounded-xl text-xs">
            <span className="text-stone-400 text-[11px] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>تماس مستقیم:</span>
            </span>
            <a href={`tel:${barista.phone}`} className="font-mono text-emerald-400 font-bold hover:underline">
              {toPersianDigits(barista.phone)}
            </a>
          </div>
        </div>

      </div>

      {/* Action Footer: Working handlers */}
      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(barista)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-stone-200 bg-stone-800/80 hover:bg-stone-700 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>پروفایل کامل</span>
        </button>

        <button
          onClick={() => onSendOffer(barista)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>پیشنهاد کار</span>
        </button>
      </div>

    </div>
  );
};
