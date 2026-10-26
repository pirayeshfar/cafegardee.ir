# ☕ Cafegardee Pro (cafegardee.ir)
### Iran's Premier Specialty Barista & Coffee Talent Network

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase Ready](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 🌟 Overview & Origin Story

**Cafegardee Pro** (`cafegardee.ir`) is the premier talent directory, recruitment hub, and community ecosystem for specialty coffee baristas and coffee shop owners in Iran.

Originally established in **2017 (1396)** as an authoritative coffee news and cafe discovery directory by **Amir Saman Pirayeshfar**, the platform has evolved into an uncopyable, human-centric talent marketplace. Rather than relying on static cafe listings that generic competitors can easily duplicate, Cafegardee Pro places the spotlight on **baristas, sensory masters, brew specialists, and authentic employment matchmaking**.

All core services—from barista profiles to job postings and direct phone contacts—are **100% free with zero commission fees**, supported through voluntary community patron funding via [Hamibash](https://hamibash.com/cafegardee) and curated cafe sponsorships.

---

## 🚀 Key Features

### 1. 🫘 Verified Barista Talent Directory
- **Comprehensive Profiles**: Showcases work experience, coffee academy certifications, sensory skills, and daily calibration capabilities.
- **Mastered Equipment Inventory**: Highlights barista proficiency across leading commercial machines (*La Marzocco*, *Slayer*, *Victoria Arduino*, *Sanremo*, *Nuova Simonelli*, *Mahlkönig*, *Synesso*).
- **Multi-Dimensional Filtering**: Search by Iranian metropolis (Tehran, Isfahan, Shiraz, Mashhad, Rasht, Tabriz), specialty skill, work availability (Full-time, Part-time, Consulting/Setup, Rotating Shifts), and minimum years of experience.
- **100% Direct Contact**: Direct one-tap telephone calls (`tel:`) and instant Telegram messaging with no paywalls or intermediation fees.

### 2. ⚡ Smart Live Instagram Needs Analyzer
- **Automatic Story & Feed Extraction**: Features an intelligent scanner that parses recent Instagram stories and bios from partner cafes to extract real-time hiring needs (e.g., *"Urgent: Evening shift head barista needed on Slayer v3"*).
- **Instant Cafe Handle Analyzer**: Any user or cafe owner can enter an Instagram handle to extract job openings, bar setups, and specialty beans instantly.

### 3. 💼 Cafe Job Board
- **Active Cafe Vacancies**: Clear presentation of salary packages, shift hours, employee benefits (social security insurance, staff meals, sales target bonuses), and installed bar machinery.
- **Fast Application Modal**: Baristas can apply or contact cafe management with one click.

### 4. 🖤 Cinematic Black Intro Screen
- Full-screen pitch-black aesthetic upon page load featuring the bold, elegant white `Cafegardee.ir` wordmark, subtle golden caramel glow, and smooth cross-dissolve fade transition into the site.

### 5. 👑 Founder & Admin Management Portal
- Private admin dashboard accessible via secure email verification (`pirayeshfar@gmail.com`).
- **Custom Header Logo Upload**: Founder can upload a custom PNG/SVG logo directly from their local drive, which persists seamlessly across the header and footer.
- **Database Backup**: One-click full JSON database export for offline archiving.
- **Sponsorship Ads Manager**: Add and manage featured cafe promotional cards.

### 6. ❤️ Community Patron Integration (Hamibash)
- Deep integration with **[Hamibash](https://hamibash.com/cafegardee)**, Iran's trusted and legal patron funding platform, allowing grateful community members to "buy a cup of coffee" for platform server maintenance.

---

## 🛠️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                       Cafegardee.ir                         │
│               Frontend: React 19 + TypeScript + Vite         │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│     Client State & Storage   │       │   PostgreSQL (Supabase)      │
│  - Instant Local Persistence │       │  - Optional Remote Database  │
│  - Full Offline Resilience   │       │  - Supabase Schema Included  │
│  - Zero Iranian Proxy Blocks │       │  - Ready for Vercel Deploy   │
└──────────────────────────────┘       └──────────────────────────────┘
```

- **Framework**: React 19 SPA powered by Vite 8
- **Language**: TypeScript with strict types
- **Styling**: Tailwind CSS v4 (RTL-first Persian layout with Vazirmatn typography)
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Database**: Dual architecture (Client-side offline-first persistence + optional remote Supabase PostgreSQL)
- **Hosting**: Optimized for Vercel, Netlify, or standard VPS

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cafegardee.git
cd cafegardee
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🗄️ Supabase Database Integration Guide

Cafegardee Pro is engineered to work out of the box with local persistence, but is 100% prepared to connect to your **[Supabase](https://supabase.com/)** account.

### Step 1: Run the Database Schema
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project (e.g., `cafegardee-db`).
3. Open the **SQL Editor** from the left sidebar.
4. Copy the entire contents of [`supabase-schema.sql`](./supabase-schema.sql) located in the root of this project.
5. Paste it into the SQL Editor and click **Run**. This will generate:
   - `public.baristas`
   - `public.jobs`
   - `public.sponsored_cafes`
   - `public.applications`
   - Row-Level Security (RLS) policies allowing public read and insert.

### Step 2: Configure Environment Variables
In your project root, create a `.env` file (or copy `.env.example`):
```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

---

## 🚀 Deployment to Vercel

### 1-Click Vercel Deployment:
1. Push your code to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub `cafegardee` repository.
4. Framework Preset will automatically detect **Vite**.
5. *(Optional)* Add your Supabase environment variables under **Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**.
7. In Vercel Project Settings > **Domains**, add your custom domain: `cafegardee.ir`.

---

## 📄 License & Attribution

All rights reserved © 2017–2026 **cafegardee.ir**.

```
══════════════════════════════════════════════════════════════════
  Designed, Created & Founded by:
  Amir Saman Pirayeshfar (امیرسامان پیرایش فر)
  Active in Iran's specialty coffee community since 2017 (۱۳۹۶)
══════════════════════════════════════════════════════════════════
```
