import React, { useState } from 'react';
import { Barista } from '../types';
import { BaristaCard } from './BaristaCard';
import { Filter, SlidersHorizontal, UserPlus, RefreshCw, CheckCircle2 } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface BaristaDirectoryProps {
  baristas: Barista[];
  searchQuery: string;
  selectedCity: string;
  selectedSkill: string;
  onSelectBarista: (barista: Barista) => void;
  onSendOffer: (barista: Barista) => void;
  onOpenRegister: () => void;
  onResetFilters: () => void;
}

export const BaristaDirectory: React.FC<BaristaDirectoryProps> = ({
  baristas,
  searchQuery,
  selectedCity,
  selectedSkill,
  onSelectBarista,
  onSendOffer,
  onOpenRegister,
  onResetFilters,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [minExperience, setMinExperience] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'newest'>('rating');

  // Filter logic
  const filteredBaristas = baristas.filter((barista) => {
    // City filter
    if (selectedCity !== 'همه شهرها' && barista.city !== selectedCity) {
      return false;
    }

    // Skill filter
    if (selectedSkill !== 'همه تخصص‌ها' && !barista.skills.some((s) => s.includes(selectedSkill) || selectedSkill.includes(s))) {
      return false;
    }

    // Availability filter
    if (selectedAvailability !== 'all' && barista.availability !== selectedAvailability) {
      return false;
    }

    // Minimum experience filter
    if (barista.experienceYears < minExperience) {
      return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = barista.name.toLowerCase().includes(q);
      const matchTitle = barista.roleTitle.toLowerCase().includes(q);
      const matchCity = barista.city.toLowerCase().includes(q);
      const matchSkills = barista.skills.some((s) => s.toLowerCase().includes(q));
      const matchMachines = barista.machines.some((m) => m.toLowerCase().includes(q));
      const matchBio = barista.bio.toLowerCase().includes(q);

      return matchName || matchTitle || matchCity || matchSkills || matchMachines || matchBio;
    }

    return true;
  });

  // Sort logic
  const sortedBaristas = [...filteredBaristas].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'experience') {
      return b.experienceYears - a.experienceYears;
    }
    return 0; // newest
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>بانک استعدادها · ۱۰۰٪ ارتباط مستقیم و رایگان</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            باریستاهای متخصص و آماده به کار
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            شماره تماس، سوابق تایید شده و دستگاه‌های تحت تسلط هر باریستا بدون نیاز به اشتراک
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={onOpenRegister}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>ثبت رایگان نام به عنوان باریستا</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar (Segmented Controls & Options) */}
      <div className="bg-stone-900/60 border border-stone-800 p-3.5 sm:p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Availability segmented buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <span className="text-stone-400 font-medium ml-2 whitespace-nowrap hidden sm:inline">
            وضعیت همکاری:
          </span>
          {[
            { id: 'all', label: 'همه' },
            { id: 'fulltime', label: 'تمام وقت' },
            { id: 'parttime', label: 'پاره وقت' },
            { id: 'shift', label: 'شیفت عصر/چرخشی' },
            { id: 'consulting', label: 'مشاوره و راه‌اندازی' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedAvailability(item.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedAvailability === item.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-950/40 hover:bg-stone-950'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Experience & Sort Options */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          <div className="flex items-center gap-1.5 text-stone-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
            <span>حداقل سابقه:</span>
            <select
              value={minExperience}
              onChange={(e) => setMinExperience(Number(e.target.value))}
              className="bg-stone-950 border border-stone-700 text-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value={0}>بدون شرط</option>
              <option value={2}>بیش از ۲ سال</option>
              <option value={4}>بیش از ۴ سال</option>
              <option value={6}>بیش از ۶ سال (ارشد)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-stone-400">
            <span>مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-950 border border-stone-700 text-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="rating">بالاترین امتیاز</option>
              <option value="experience">بیشترین سابقه کاری</option>
              <option value="newest">جدیدترین پروفایل‌ها</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
        <div>
          نمایش <span className="font-mono font-bold text-amber-400 tabular-nums">{toPersianDigits(sortedBaristas.length)}</span> باریستا بر اساس فیلترهای انتخابی
        </div>
        {(selectedCity !== 'همه شهرها' || selectedSkill !== 'همه تخصص‌ها' || selectedAvailability !== 'all' || minExperience > 0 || searchQuery !== '') && (
          <button
            onClick={onResetFilters}
            className="text-stone-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>پاک کردن همه فیلترها</span>
          </button>
        )}
      </div>

      {/* Baristas Grid */}
      {sortedBaristas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBaristas.map((barista) => (
            <BaristaCard
              key={barista.id}
              barista={barista}
              onSelect={onSelectBarista}
              onSendOffer={onSendOffer}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-12 text-center max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-200 mb-2">
            باریستایی با این مشخصات یافت نشد
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed mb-6">
            می‌توانید فیلترهای شهر یا تخصص را تغییر دهید یا خودتان به صورت رایگان ثبت‌نام کنید.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onResetFilters}
              className="px-4 py-2 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              پاک کردن فیلترها
            </button>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
            >
              ثبت پروفایل باریستا
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
