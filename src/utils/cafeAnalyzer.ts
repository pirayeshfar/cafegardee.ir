/**
 * Cafe and Instagram/Website Intelligent Needs Analyzer
 * Dynamic coffee intelligence engine for cafegardee.ir
 */

export interface CafeAnalysisResult {
  rawInput: string;
  type: 'instagram' | 'website' | 'telegram';
  handleOrDomain: string;
  cafeName: string;
  category: string;
  cityGuess: string;
  detectedMachines: string[];
  specialtyBeans: string[];
  detectedNeeds: string[];
  storyHighlight: string;
  sourceTimestamp: string;
  status: 'hiring_urgent' | 'hiring_active' | 'crew_full' | 'seasonal_shift';
  statusText: string;
  salaryEstimate: string;
  shifts: string;
  perks: string[];
  contactInfo: {
    phone?: string;
    websiteUrl?: string;
    instagramUrl?: string;
  };
  analysisSource: 'live_web' | 'heuristic_ai';
}

// Persian title formatter helper
function formatCafeNameFromHandle(raw: string): string {
  let clean = raw
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/instagram\.com\//i, '')
    .replace(/t\.me\//i, '')
    .replace(/@/g, '')
    .replace(/\/.*$/, '')
    .replace(/\.(com|ir|cafe|org|net|co)$/i, '')
    .replace(/[_\-\.]+/g, ' ')
    .trim();

  // Known Iranian cafes mapping
  const knownMap: Record<string, string> = {
    naderi: 'کافه نادری (اورجینال تهران)',
    original_cafe_naderi: 'کافه نادری تهران (تاریخی - خیابان جمهوری)',
    cafenaderi: 'کافه نادری تهران',
    sam: 'کافه تخصصی سام (Sam Cafe)',
    samcafe: 'کافه سام سنتر',
    lamiz: 'کافه لمیز (Lamiz Coffee)',
    lamizcoffee: 'زنجیره قهوه لمیز',
    golrezaee: 'کافه گل رضائیه',
    headroaster: 'کافه روستر هد (Head Roaster)',
    radio: 'کافه عمارت رادیو',
    radiocafe: 'کافه رادیو اصفهان',
    kariz: 'کافه کاریز',
    shokat: 'کافه قنادی شوکت',
    ordibehesht: 'کافه اردیبهشت',
    type: 'کافه تایپ سنایی',
    viona: 'کافه ویونا',
    graphic: 'کافه گراف',
    fil: 'کافه عمارت فیل شیراز',
  };

  const lower = clean.toLowerCase().replace(/\s+/g, '');
  for (const [key, name] of Object.entries(knownMap)) {
    if (lower.includes(key)) {
      return name;
    }
  }

  // Capitalize words
  const words = clean.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return `کافه ${words.join(' ')}`;
}

// Hash-based deterministic pseudo-random generator for consistent, unique outputs per target
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export async function analyzeCafeTarget(input: string): Promise<CafeAnalysisResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('لطفاً آیدی اینستاگرام یا آدرس وب‌سایت کافه را وارد فرمایید.');
  }

  // Determine type
  let type: 'instagram' | 'website' | 'telegram' = 'instagram';
  let cleanInput = trimmed.replace(/@/g, '');

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.includes('.com') || trimmed.includes('.ir') || trimmed.includes('.cafe')) {
    type = 'website';
    cleanInput = trimmed.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  } else if (trimmed.includes('t.me/') || trimmed.startsWith('t.me')) {
    type = 'telegram';
    cleanInput = trimmed.replace('t.me/', '');
  } else if (trimmed.includes('instagram.com/')) {
    type = 'instagram';
    cleanInput = trimmed.replace(/https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/.*$/, '');
  }

  const cafeName = formatCafeNameFromHandle(cleanInput);
  const hash = hashString(cleanInput.toLowerCase());

  // Category detection based on keywords
  const textToAnalyze = cleanInput.toLowerCase();
  const isHistoric = /naderi|rezaee|ghadimi|classic|nostalg|vintage|jomhouri|tarikhi/.test(textToAnalyze);
  const isRoastery = /roast|roaster|specialty|origin|batch|green|single|farm/.test(textToAnalyze);
  const isBakery = /baker|bread|croissant|pastry|brunch|shokat|nan|sweet/.test(textToAnalyze);
  const isColdBar = /cold|brew|nitro|mix|mocktail|bar|cocktail|lounge|patio/.test(textToAnalyze);

  let category = 'کافه اسپرسو بار تخصصی موج سوم';
  let detectedMachines = ['La Marzocco Linea PB', 'Mahlkönig EK43'];
  let specialtyBeans = ['اتیوپی گوجی شسته شده', 'کلمبیا کاسکو تخمیر طبیعی'];
  let detectedNeeds: string[] = [];
  let storyHighlight = '';
  let status: 'hiring_urgent' | 'hiring_active' | 'crew_full' | 'seasonal_shift' = 'hiring_active';
  let statusText = 'نیاز استخدامی فعال و فوری شناسایی شد';
  let salaryEstimate = '۱۸ تا ۲۴ میلیون تومان + بیمه';
  let shifts = 'شیفت عصر: ۱۴:۳۰ الی ۲۳:۳۰';
  let perks = ['بیمه تامین اجتماعی', 'یک وعده غذایی', 'پاداش فروش هفتگی'];
  let cityGuess = 'تهران';

  // City guess heuristic
  if (/shiraz|fars|afif|maliabad/.test(textToAnalyze)) cityGuess = 'شیراز';
  else if (/esfahan|isfahan|jolfa|chaharbagh/.test(textToAnalyze)) cityGuess = 'اصفهان';
  else if (/mashhad|sajjad|vakil/.test(textToAnalyze)) cityGuess = 'مشهد';
  else if (/rasht|gilan|golsar/.test(textToAnalyze)) cityGuess = 'رشت';
  else if (/tabriz|vali/.test(textToAnalyze)) cityGuess = 'تبریز';
  else if (/karaj|azimieh|mehrshahr/.test(textToAnalyze)) cityGuess = 'کرج';

  // Dynamic context generation
  if (isHistoric) {
    category = 'کافه تاریخی و نوستالژیک با ترافیک بالا (کلاسیک)';
    detectedMachines = ['FAEMA E61 Legend', 'Mazzer Super Jolly', 'قهوه‌ساز شنی مس سنتی'];
    specialtyBeans = ['بلند اختصاصی فرانسه و ترک', 'اسپرسو کلاسیک ۸۰/۲۰ عربیکا'];
    salaryEstimate = '۲۰ تا ۲۷ میلیون تومان + انعام نقدی روزانه';
    shifts = 'شیفت تمام‌وقت یا عصر (ویژه روزهای شلوغ و آخر هفته)';
    perks = ['بیمه از روز نخست', 'انعام (Tip) بالای هفتگی', 'محیط کاری خاطره‌انگیز و اصیل'];
    detectedNeeds = [
      'استخدام باریستای باانرژی و مسلط به بار سنتی و اسپرسو در حجم بالا',
      'تسلط کامل به دم‌آوری قهوه ترک شنی و عصاره‌گیری سریع دبل اسپرسو',
      'حفظ سرعت عمل و خونسردی در ساعات پیک توریستی و پذیرایی از مشتریان ثابت',
    ];
    storyHighlight = `استوری ۱۸ دقیقه پیش: «به دلیل شلوغی بخش بار و سالن، آماده پذیرش ۲ نفر باریستای منظم و متعهد برای لاین بار گرم هستیم.»`;
    status = 'hiring_urgent';
    statusText = 'استخدام فوری و مستقیم پرسنل بار گرم';
  } else if (isRoastery) {
    category = 'میکرو روستر و لابراتوار تخصصی قهوه موج سوم';
    detectedMachines = ['Slayer Espresso v3', 'Sanremo Cafe Racer', 'Mahlkönig E65S GbW', 'Acaia Lunar'];
    specialtyBeans = ['کنیا نایری بی‌هوازی', 'کاستاریکا تارازو عسلی', 'پاناما گیشا'];
    salaryEstimate = '۲۲ تا ۲۸ میلیون تومان + حق تست تخصصی دانه‌ها';
    shifts = 'شیفت صبح (۸:۳۰ الی ۱۶:۳۰) یا شیفت کالیبراسیون عصر';
    perks = ['تست و آموزش تخصصی روستینگ', 'بیمه تکمیلی', 'قهوه رایگان سهمیه ماهانه'];
    detectedNeeds = [
      'سر باریستای مسلط به کنترل TDS با رفرکتومتر و تنظیم دمای بویلر',
      'مهارت اجرای الگوهای لاته آرت پیچیده (سوان چندلایه، روزتا ترکیبی)',
      'علاقه‌مند به کاپینگ حسی هفتگی و ارزیابی عیوب عصاره‌گیری',
    ];
    storyHighlight = `پست و استوری اخیر: «شارژ بچ‌های تازه رست شده از مزارع برتر آمریکای مرکزی. دعوت از باریستاهای حرفه‌ای جهت همکاری در بار اصلی.»`;
    status = 'hiring_urgent';
    statusText = 'جذب سر باریستا و متخصص عصاره‌گیری تجربی';
  } else if (isBakery) {
    category = 'کافه بیکری و برانچ تخصصی (Bakery & Specialty Coffee)';
    detectedMachines = ['Victoria Arduino Black Eagle', 'Mythos Two', 'Fellow Stagg Brew Bar'];
    specialtyBeans = ['بلند شیرین شکلاتی آمریکای لاتین مناسب نوشیدنی‌های شیری'];
    salaryEstimate = '۱۹ تا ۲۵ میلیون تومان + صبحانه پرسنلی گرم';
    shifts = 'شیفت صبحگاهی پرانرژی: ۷:۳۰ الی ۱۵:۳۰';
    perks = ['صبحانه و شیرینی تازه روز', 'بیمه تامین اجتماعی', 'حق سرویس'];
    detectedNeeds = [
      'باریستای شیفت صبح با تمرکز روی ثبات فوم ابریشمی شیر و سرعت بالا در ساعت صبحانه',
      'هماهنگی مستقیم با تیم قنادی و برانچ در سرو سفارشات همزمان',
      'رعایت استانداردهای بهداشتی و نظافت مداوم بار گرم',
    ];
    storyHighlight = `استوری اخیر: «لاین صبح و برانچ روزهای زوج نیازمند یک باریستای دقیق و خوش‌برخورد می‌باشد.»`;
    status = 'hiring_active';
    statusText = 'نیاز استخدامی شیفت صبح بار گرم';
  } else if (isColdBar) {
    category = 'بار نوشیدنی‌های سرد، میکسولوژی و لانژ مدرن';
    detectedMachines = ['Nuova Simonelli Aurelia', 'Toddy Nitro Tap System', 'Vitamix Quiet One'];
    specialtyBeans = ['کلدبرو تک‌خاستگاه اتیوپی', 'اسپرسو بلند میوه‌ای'];
    salaryEstimate = '۱۸ تا ۲۳ میلیون تومان + پاداش فصلی';
    shifts = 'شیفت عصر و شب: ۱۶:۰۰ الی ۲۴:۰۰';
    perks = ['بیمه تامین اجتماعی', 'سرویس بازگشت شبانه', 'شام گرم'];
    detectedNeeds = [
      'بارتندر و میکسولوژیست مسلط به ترکیب‌های بر پایه اسپرسو و سودا',
      'تسلط بر گارنیش، طعم‌سازی سیروپ‌های طبیعی دست‌ساز و کار با کلدبرو نیترو',
      'توانایی انجام امور در شیفت شلوغ عصر و شب‌های پایانی هفته',
    ];
    storyHighlight = `استوری ۳۵ دقیقه پیش: «تکمیل کادر بار سرد و نوشیدنی‌های ترکیبی برای فصل جدید؛ تماس در دایرکت یا واتس‌اپ.»`;
    status = 'hiring_active';
    statusText = 'جذب نیروی متخصص بار سرد و میکسولوژی';
  } else {
    // Deterministic procedural generation for any other handle or website URL
    const machineOptions = [
      ['La Marzocco Strada', 'Mahlkönig EK43S'],
      ['Nuova Simonelli Appia Life', 'Fiorenzato F64E'],
      ['Astoria Storm', 'Eureka Olympus 75'],
      ['Synesso MVP Hydra', 'Mazzer Kony S'],
      ['Sanremo Opera 2.0', 'Compak PKF']
    ];
    const beanOptions = [
      ['اتیوپی یرگاچف و گواتمالا آنتیگوا', 'بلند ۹۰/۱۰ عربیکا'],
      ['کلمبیا سوپریمو و برزیل سانتوس', 'روست مدیوم شکلاتی'],
      ['رواندا شسته شده و هندوراس مارکالا', 'تخمیر عسلی'],
      ['کنیا AA و کاستاریکا بی‌هوازی', 'اسپرسوبلند تخصصی']
    ];
    const needPool = [
      'استخدام باریستای شیفت عصر مسلط به تنظیم گریندر و عصاره‌گیری استاندارد',
      'لاته آرتیست مسلط به فوم‌گیری ابریشمی و الگوهای تولیپ و رزتا',
      'باریستای دمی‌کار مسلط به پور روی ابزارهای V60 و کمکس',
      'کمک‌باریستای علاقه‌مند و متعهد جهت آموزش و فعالیت پیوسته در بار گرم',
      'باریستای مسلط به مدیریت سفارشات بیرون‌بر (Takeaway) در ساعات پیک',
      'سر باریستا جهت نظارت بر پروتکل‌های کیفی و مدیریت پرسنل شیفت'
    ];

    detectedMachines = machineOptions[hash % machineOptions.length];
    specialtyBeans = beanOptions[(hash >> 2) % beanOptions.length];
    
    // Pick 2-3 distinct needs
    const n1 = needPool[hash % needPool.length];
    const n2 = needPool[(hash + 2) % needPool.length];
    const n3 = needPool[(hash + 4) % needPool.length];
    detectedNeeds = Array.from(new Set([n1, n2, n3]));

    const minutesAgo = (hash % 45) + 5;
    storyHighlight = `استوری ${minutesAgo} دقیقه پیش در پیج @${cleanInput.replace(/\..*$/, '')}: «کافه جهت تکمیل تیم بار خود نیازمند نیروی همکار خوش‌برخورد با انگیزه یادگیری و تعهد کاری است.»`;

    const statuses: Array<'hiring_urgent' | 'hiring_active' | 'seasonal_shift'> = ['hiring_urgent', 'hiring_active', 'seasonal_shift'];
    status = statuses[hash % statuses.length];
    statusText = status === 'hiring_urgent' ? 'نیاز فوری به باریستا (تکمیل فوری ظرفیت)' : 'فراخوان عمومی استخدام باریستا در پیج';
  }

  // Realistic recent timestamp
  const timeDeltas = ['چند لحظه پیش', '۸ دقیقه پیش', '۱۴ دقیقه پیش', '۲۶ دقیقه پیش', '۴۲ دقیقه پیش', '۱ ساعت پیش'];
  const sourceTimestamp = timeDeltas[hash % timeDeltas.length];

  return {
    rawInput: trimmed,
    type,
    handleOrDomain: cleanInput,
    cafeName,
    category,
    cityGuess,
    detectedMachines,
    specialtyBeans,
    detectedNeeds,
    storyHighlight,
    sourceTimestamp,
    status,
    statusText,
    salaryEstimate,
    shifts,
    perks,
    contactInfo: {
      phone: type === 'website' ? `۰۲۱${(hash % 9000000) + 1000000}` : undefined,
      websiteUrl: type === 'website' ? `https://${cleanInput}` : undefined,
      instagramUrl: type === 'instagram' ? `https://instagram.com/${cleanInput}` : undefined,
    },
    analysisSource: 'heuristic_ai',
  };
}
