-- ==============================================================================
-- Cafegardee Pro (cafegardee.ir) - Supabase Database Schema
-- Designed and Founded by Amir Saman Pirayeshfar (Active since 2017)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Baristas Table (بانک اطلاعاتی باریستاها)
CREATE TABLE IF NOT EXISTS public.baristas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    gender TEXT DEFAULT 'male',
    role_title TEXT NOT NULL,
    city TEXT NOT NULL,
    neighborhood TEXT,
    experience_years INTEGER DEFAULT 1,
    availability TEXT DEFAULT 'fulltime',
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    machines TEXT[] DEFAULT '{}',
    previous_cafes TEXT[] DEFAULT '{}',
    certifications TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    phone TEXT NOT NULL,
    telegram TEXT,
    instagram TEXT,
    verified BOOLEAN DEFAULT true,
    rating NUMERIC(2,1) DEFAULT 5.0,
    endorsements_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Jobs Listing Table (آگهی‌های استخدامی کافه‌ها)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cafe_name TEXT NOT NULL,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    neighborhood TEXT,
    employment_type TEXT DEFAULT 'fulltime',
    salary_range TEXT,
    shifts TEXT,
    perks TEXT[] DEFAULT '{}',
    machines_in_cafe TEXT[] DEFAULT '{}',
    required_skills TEXT[] DEFAULT '{}',
    min_experience_years INTEGER DEFAULT 1,
    description TEXT,
    phone TEXT NOT NULL,
    telegram TEXT,
    urgent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Sponsored & Featured Cafes Table (کافه‌های ویژه و پایش هوشمند اینستاگرام)
CREATE TABLE IF NOT EXISTS public.sponsored_cafes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tagline TEXT,
    city TEXT NOT NULL,
    neighborhood TEXT,
    featured_image_url TEXT,
    specialty_coffee TEXT,
    machine TEXT,
    discount_offer TEXT,
    hiring_now BOOLEAN DEFAULT true,
    website_or_instagram TEXT,
    phone TEXT NOT NULL,
    is_sponsored BOOLEAN DEFAULT true,
    detected_needs TEXT[] DEFAULT '{}',
    story_highlight TEXT,
    last_scan_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Applications Table (درخواست‌های همکاری ارسال شده به کافه‌ها)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    cafe_name TEXT NOT NULL,
    barista_name TEXT NOT NULL,
    barista_phone TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.baristas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsored_cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 7. Public Read & Insert Policies (برای دسترسی آزاد و بدون فیلتر در ایران)
CREATE POLICY "Allow public read for baristas" ON public.baristas FOR SELECT USING (true);
CREATE POLICY "Allow public insert for baristas" ON public.baristas FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read for jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow public insert for jobs" ON public.jobs FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read for sponsored_cafes" ON public.sponsored_cafes FOR SELECT USING (true);
CREATE POLICY "Allow public insert for applications" ON public.applications FOR INSERT WITH CHECK (true);
