import React, { useState } from 'react';
import { Barista, JobListing } from '../types';
import { X, CheckCircle2, User, Coffee, Sparkles, Upload, Image } from 'lucide-react';
import { CITIES_LIST, SPECIALTY_SKILLS_LIST, COFFEE_MACHINES_LIST } from '../data/initialData';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType: 'barista' | 'cafe';
  onAddBarista: (barista: Barista) => void;
  onAddJob: (job: JobListing) => void;
}

const DEFAULT_MALE_AVATAR = '/src/assets/images/barista_portrait_male_1793000894818.jpg';
const DEFAULT_FEMALE_AVATAR = '/src/assets/images/barista_portrait_female_1793000895598.jpg';

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  defaultType,
  onAddBarista,
  onAddJob,
}) => {
  const [activeTab, setActiveTab] = useState<'barista' | 'cafe'>(defaultType);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Barista Form State
  const [bName, setBName] = useState('');
  const [bGender, setBGender] = useState<'male' | 'female'>('male');
  const [bCustomPhoto, setBCustomPhoto] = useState<string | null>(null);
  const [bRole, setBRole] = useState('سر باریستا');
  const [bCity, setBCity] = useState('تهران');
  const [bNeighborhood, setBNeighborhood] = useState('');
  const [bExpYears, setBExpYears] = useState(3);
  const [bAvailability, setBAvailability] = useState<'fulltime' | 'parttime' | 'consulting' | 'shift'>('fulltime');
  const [bBio, setBBio] = useState('');
  const [bPhone, setBPhone] = useState('');
  const [bTelegram, setBTelegram] = useState('');
  const [bSelectedSkills, setBSelectedSkills] = useState<string[]>(['کالیبراسیون تخصصی اسپرسو']);
  const [bSelectedMachines, setBSelectedMachines] = useState<string[]>(['La Marzocco']);

  // Cafe Job Form State
  const [cCafeName, setCCafeName] = useState('');
  const [cTitle, setCTitle] = useState('استخدام سر باریستا');
  const [cCity, setCCity] = useState('تهران');
  const [cNeighborhood, setCNeighborhood] = useState('');
  const [cSalary, setCSalary] = useState('۱۸ تا ۲۴ میلیون تومان');
  const [cShifts, setCShifts] = useState('شیفت عصر: ۱۴:۳۰ الی ۲۳:۳۰');
  const [cPhone, setCPhone] = useState('');
  const [cTelegram, setCTelegram] = useState('');
  const [cDescription, setCDescription] = useState('');
  const [cPerks, setCPerks] = useState('بیمه تامین اجتماعی، یک وعده غذا، پاداش تارگت فروش');
  const [cMachines, setCMachines] = useState('La Marzocco, Mahlkönig');

  if (!isOpen) return null;

  const currentAvatarUrl = bCustomPhoto || (bGender === 'male' ? DEFAULT_MALE_AVATAR : DEFAULT_FEMALE_AVATAR);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('حجم عکس انتخابی نباید بیشتر از ۲ مگابایت باشد.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBCustomPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleSkill = (skill: string) => {
    if (bSelectedSkills.includes(skill)) {
      setBSelectedSkills(bSelectedSkills.filter((s) => s !== skill));
    } else {
      setBSelectedSkills([...bSelectedSkills, skill]);
    }
  };

  const handleToggleMachine = (mach: string) => {
    if (bSelectedMachines.includes(mach)) {
      setBSelectedMachines(bSelectedMachines.filter((m) => m !== mach));
    } else {
      setBSelectedMachines([...bSelectedMachines, mach]);
    }
  };

  const handleBaristaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim() || !bPhone.trim()) {
      alert('لطفاً نام و شماره تماس خود را وارد فرمایید.');
      return;
    }

    const newBarista: Barista = {
      id: `barista-${Date.now()}`,
      name: bName,
      gender: bGender,
      roleTitle: bRole,
      city: bCity,
      neighborhood: bNeighborhood || 'مرکز شهر',
      experienceYears: Number(bExpYears),
      availability: bAvailability,
      bio: bBio || 'باریستای متعهد و علاقه‌مند، مسلط به استانداردهای عصاره‌گیری و کالیبراسیون قهوه تخصصی.',
      skills: bSelectedSkills.length > 0 ? bSelectedSkills : ['کالیبراسیون تخصصی اسپرسو', 'لاته آرت'],
      machines: bSelectedMachines.length > 0 ? bSelectedMachines : ['La Marzocco', 'Nuova Simonelli'],
      previousCafes: ['کافه‌های تخصصی'],
      certifications: ['گواهی مهارت باریستا'],
      avatarUrl: currentAvatarUrl,
      phone: bPhone,
      telegram: bTelegram.replace('@', ''),
      instagram: '',
      verified: true,
      rating: 5.0,
      endorsementsCount: 1,
      createdAt: 'امروز',
      isCustom: true,
    };

    onAddBarista(newBarista);
    setSuccessMessage('پروفایل و رزومه شما به صورت ۱۰۰٪ رایگان در بانک باریستاهای کافه‌گردی پرو ثبت شد!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1800);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cCafeName.trim() || !cPhone.trim()) {
      alert('لطفاً نام کافه و شماره تماس را وارد فرمایید.');
      return;
    }

    const newJob: JobListing = {
      id: `job-${Date.now()}`,
      cafeName: cCafeName,
      title: cTitle,
      city: cCity,
      neighborhood: cNeighborhood || 'مرکز شهر',
      employmentType: 'fulltime',
      salaryRange: cSalary,
      shifts: cShifts,
      perks: cPerks.split('،').map((p) => p.trim()).filter(Boolean),
      machinesInCafe: cMachines.split(',').map((m) => m.trim()).filter(Boolean),
      requiredSkills: ['تعهد کاری', 'کالیبراسیون و عصاره‌گیری'],
      minExperienceYears: 2,
      description: cDescription || `کافه ${cCafeName} به منظور تکمیل کادر بار خود از باریستاهای ماهر دعوت به همکاری می‌نماید.`,
      phone: cPhone,
      telegram: cTelegram.replace('@', ''),
      createdAt: 'امروز',
      urgent: true,
      isCustom: true,
    };

    onAddJob(newJob);
    setSuccessMessage('آگهی استخدامی کافه شما با موفقیت و رایگان در کافه‌گردی منتشر شد!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-right my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-100 bg-stone-800/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {successMessage ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-100">ثبت با موفقیت انجام شد</h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto">{successMessage}</p>
          </div>
        ) : (
          <>
            {/* Header and Tab switcher */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-stone-100 mb-2">
                ثبت نام رایگان در شبکه کافه‌گردی
              </h2>
              <p className="text-xs text-stone-400">
                ثبت مستقیم بدون واسطه، بدون کمیسیون و کاملاً رایگان برای باریستاها و کافه‌ها
              </p>

              {/* Segmented Control */}
              <div className="mt-5 p-1 bg-stone-950 rounded-xl border border-stone-800 flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('barista')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'barista'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>ثبت نام باریستا (جویای کار)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cafe')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'cafe'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Coffee className="w-4 h-4" />
                  <span>ثبت آگهی استخدام کافه</span>
                </button>
              </div>
            </div>

            {/* BARISTA FORM */}
            {activeTab === 'barista' && (
              <form onSubmit={handleBaristaSubmit} className="space-y-4 text-xs">
                
                {/* Avatar selection & upload */}
                <div className="bg-stone-950/70 border border-stone-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 shrink-0">
                    <img
                      src={currentAvatarUrl}
                      alt="پیش‌نمایش تصویر باریستا"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-stone-300 font-medium">جنسیت (انتخاب عکس ثابت):</span>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            checked={bGender === 'male'}
                            onChange={() => setBGender('male')}
                            className="text-amber-500"
                          />
                          <span>آقا</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            checked={bGender === 'female'}
                            onChange={() => setBGender('female')}
                            className="text-amber-500"
                          />
                          <span>خانم</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">
                        یا بارگذاری عکس پرسنلی اختصاصی خودتان:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="block w-full text-[11px] text-stone-400 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-stone-800 file:text-amber-400 cursor-pointer"
                      />
                      {bCustomPhoto && (
                        <button
                          type="button"
                          onClick={() => setBCustomPhoto(null)}
                          className="text-[10px] text-red-400 mt-1 hover:underline"
                        >
                          بازگشت به عکس ثابت پیش‌فرض
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سهراب حسینی"
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">عنوان تخصصی *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سر باریستا، باریستا دمی موج سوم، لاته آرتیست"
                      value={bRole}
                      onChange={(e) => setBRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شهر *</label>
                    <select
                      value={bCity}
                      onChange={(e) => setBCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {CITIES_LIST.filter((c) => c !== 'همه شهرها').map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">منطقه / محله</label>
                    <input
                      type="text"
                      placeholder="مثال: انقلاب / فرشته / جلفا"
                      value={bNeighborhood}
                      onChange={(e) => setBNeighborhood(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">سابقه کاری (سال)</label>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={bExpYears}
                      onChange={(e) => setBExpYears(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شماره تماس (جهت ارتباط مستقیم کافه‌ها) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲..."
                      value={bPhone}
                      onChange={(e) => setBPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">آیدی تلگرام (اختیاری)</label>
                    <input
                      type="text"
                      placeholder="username"
                      value={bTelegram}
                      onChange={(e) => setBTelegram(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">انتخاب مهارت‌های اصلی شما:</label>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTY_SKILLS_LIST.filter((s) => s !== 'همه تخصص‌ها').map((skill) => (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleToggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          bSelectedSkills.includes(skill)
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-medium'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {bSelectedSkills.includes(skill) ? '✓ ' : '+ '}
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">دستگاه‌های مسلط:</label>
                  <div className="flex flex-wrap gap-2">
                    {COFFEE_MACHINES_LIST.filter((m) => m !== 'همه دستگاه‌ها').map((mach) => (
                      <button
                        type="button"
                        key={mach}
                        onClick={() => handleToggleMachine(mach)}
                        className={`px-3 py-1 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                          bSelectedMachines.includes(mach)
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {mach}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">درباره خود، تجربیات قبلی و نحوه کار</label>
                  <textarea
                    rows={3}
                    placeholder="توضیح مختصری درباره تجربه کاری در کافه‌ها، ساعات آزاد، مدارک آموزشی و اهداف کاری..."
                    value={bBio}
                    onChange={(e) => setBBio(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg"
                  >
                    ثبت رایگان پروفایل در بانک باریستاها
                  </button>
                </div>

              </form>
            )}

            {/* CAFE JOB FORM */}
            {activeTab === 'cafe' && (
              <form onSubmit={handleJobSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">نام کافه *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: کافه تخصصی لومیر"
                      value={cCafeName}
                      onChange={(e) => setCCafeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">عنوان شغل مورد نیاز *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: استخدام سر باریستا یا لاته آرتیست"
                      value={cTitle}
                      onChange={(e) => setCTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شهر *</label>
                    <select
                      value={cCity}
                      onChange={(e) => setCCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {CITIES_LIST.filter((c) => c !== 'همه شهرها').map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">محدوده کافه</label>
                    <input
                      type="text"
                      placeholder="مثال: خیابان مطهری، چهارباغ عباسی، قصردشت"
                      value={cNeighborhood}
                      onChange={(e) => setCNeighborhood(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">میزان حقوق پیشنهادی</label>
                    <input
                      type="text"
                      placeholder="مثال: ۱۸ تا ۲۵ میلیون تومان + پاداش"
                      value={cSalary}
                      onChange={(e) => setCSalary(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شیفت و ساعت کاری</label>
                    <input
                      type="text"
                      placeholder="مثال: شیفت عصر ۱۴:۳۰ الی ۲۳:۳۰"
                      value={cShifts}
                      onChange={(e) => setCShifts(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">شماره تماس مدیر جهت هماهنگی *</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲..."
                      value={cPhone}
                      onChange={(e) => setCPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">دستگاه‌های مستقر در بار</label>
                    <input
                      type="text"
                      placeholder="مثال: La Marzocco Strada, Mahlkönig EK43"
                      value={cMachines}
                      onChange={(e) => setCMachines(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">مزایا و شرایط (با کاما جدا کنید)</label>
                  <input
                    type="text"
                    placeholder="بیمه تامین اجتماعی، شام گرم، پاداش فروش، سرویس برگشت"
                    value={cPerks}
                    onChange={(e) => setCPerks(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">شرح موقعیت و انتظارات</label>
                  <textarea
                    rows={3}
                    placeholder="شرح محیط کار، اخلاق تیمی مورد نظر، سرعت عمل و جزئیات بیشتر..."
                    value={cDescription}
                    onChange={(e) => setCDescription(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg"
                  >
                    انتشار رایگان آگهی استخدام در شبکه کافه‌گردی
                  </button>
                </div>

              </form>
            )}

          </>
        )}

      </div>
    </div>
  );
};
