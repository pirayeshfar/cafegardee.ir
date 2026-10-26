import React, { useState } from 'react';
import { JobListing } from '../types';
import { Briefcase, MapPin, DollarSign, Clock, ShieldCheck, Wrench, Plus, Send, Phone, AlertCircle } from 'lucide-react';
import { CITIES_LIST } from '../data/initialData';

interface JobBoardProps {
  jobs: JobListing[];
  onOpenRegisterCafe: () => void;
  onApplyJob: (job: JobListing) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({
  jobs,
  onOpenRegisterCafe,
  onApplyJob,
  selectedCity,
  setSelectedCity,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [onlyUrgent, setOnlyUrgent] = useState<boolean>(false);

  const filteredJobs = jobs.filter((job) => {
    if (selectedCity !== 'همه شهرها' && job.city !== selectedCity) {
      return false;
    }
    if (filterType !== 'all' && job.employmentType !== filterType) {
      return false;
    }
    if (onlyUrgent && !job.urgent) {
      return false;
    }
    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
            فرصت‌های استخدامی صنعت قهوه
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            آگهی‌های استخدامی کافه‌ها
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            مستقیماً برای موقعیت‌های شغلی کافه‌های سراسر ایران درخواست دهید یا تماس بگیرید
          </p>
        </div>

        <button
          onClick={onOpenRegisterCafe}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer shadow-lg shadow-amber-950/30"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت آگهی استخدام جدید کافه</span>
        </button>
      </div>

      {/* Filter Strip */}
      <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* City Filter */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span className="text-stone-400">شهر:</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-stone-950 border border-stone-700 text-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {CITIES_LIST.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Type Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'all', label: 'همه موقعیت‌ها' },
            { id: 'fulltime', label: 'تمام وقت' },
            { id: 'parttime', label: 'پاره وقت' },
            { id: 'shift', label: 'شیفتی' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterType === type.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-950/40'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Urgent filter toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-stone-300">
          <input
            type="checkbox"
            checked={onlyUrgent}
            onChange={(e) => setOnlyUrgent(e.target.checked)}
            className="rounded border-stone-700 bg-stone-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
          />
          <span className="flex items-center gap-1 text-amber-400">
            <AlertCircle className="w-3.5 h-3.5" />
            فقط استخدام‌های فوری
          </span>
        </label>

      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-stone-900/70 border border-stone-800 hover:border-amber-600/40 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              
              {/* Job Details */}
              <div className="flex-1">
                
                {/* Cafe Name & Location */}
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                  <span className="font-semibold text-amber-400 text-sm">{job.cafeName}</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>{job.city} ({job.neighborhood})</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="font-mono">{job.createdAt}</span>
                  {job.urgent && (
                    <span className="bg-red-950/60 text-red-400 border border-red-800/60 px-2 py-0.5 rounded text-[10px] font-bold mr-2">
                      استخدام فوری
                    </span>
                  )}
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-stone-100 mb-2">
                  {job.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-300 leading-relaxed mb-4 max-w-3xl font-light">
                  {job.description}
                </p>

                {/* Key metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs mb-4">
                  
                  <div className="bg-stone-950/50 border border-stone-800/60 p-2.5 rounded-xl flex items-center gap-2 text-stone-300">
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-stone-500 block">حقوق پیشنهادی:</span>
                      <span className="font-bold text-emerald-400">{job.salaryRange}</span>
                    </div>
                  </div>

                  <div className="bg-stone-950/50 border border-stone-800/60 p-2.5 rounded-xl flex items-center gap-2 text-stone-300">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-stone-500 block">شیفت کاری:</span>
                      <span>{job.shifts}</span>
                    </div>
                  </div>

                  <div className="bg-stone-950/50 border border-stone-800/60 p-2.5 rounded-xl flex items-center gap-2 text-stone-300">
                    <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[11px] text-stone-500 block">دستگاه‌های کافه:</span>
                      <span className="font-mono text-stone-200">{job.machinesInCafe.join('، ')}</span>
                    </div>
                  </div>

                </div>

                {/* Perks list */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-stone-500 text-[11px]">مزایا و تسهیلات:</span>
                  {job.perks.map((perk, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-950 text-stone-300 border border-stone-800/80 px-2 py-0.5 rounded-md text-[11px]"
                    >
                      ✓ {perk}
                    </span>
                  ))}
                </div>

              </div>

              {/* Actions Box */}
              <div className="lg:w-56 shrink-0 flex flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-800">
                <button
                  onClick={() => onApplyJob(job)}
                  className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ارسال رزومه و درخواست</span>
                </button>

                <a
                  href={`tel:${job.phone}`}
                  className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تماس با مدیر کافه</span>
                </a>

                {job.telegram && (
                  <a
                    href={`https://t.me/${job.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 text-center text-xs text-stone-400 hover:text-sky-400 transition-colors"
                  >
                    ارسال پیام در تلگرام ({job.telegram}@)
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
