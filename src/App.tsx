import React, { useState, useEffect } from 'react';
import { Barista, JobListing, JobApplication, DirectOffer, SponsoredCafe, SiteSettings } from './types';
import { INITIAL_BARISTAS, INITIAL_JOBS, INITIAL_SPONSORED_CAFES, DEFAULT_SITE_SETTINGS } from './data/initialData';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BaristaDirectory } from './components/BaristaDirectory';
import { JobBoard } from './components/JobBoard';
import { FeaturedCafesSection } from './components/FeaturedCafesSection';
import { AboutSection } from './components/AboutSection';
import { BaristaModal } from './components/BaristaModal';
import { RegisterModal } from './components/RegisterModal';
import { SendOfferModal } from './components/SendOfferModal';
import { ApplyJobModal } from './components/ApplyJobModal';
import { AdminModal } from './components/AdminModal';
import { DonationModal } from './components/DonationModal';
import { BaristaDashboardModal } from './components/BaristaDashboardModal';
import { Footer } from './components/Footer';

export default function App() {
  // Intro splash state: starts true on every page visit for pure cinematic intro
  const [showIntro, setShowIntro] = useState(true);

  const handleCompleteIntro = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState<'baristas' | 'jobs' | 'cafes' | 'about'>('baristas');

  // Site Settings (Custom logo, founder name, year, admin email)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_site_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // Sponsored Cafes Ads with live smart needs
  const [sponsoredCafes, setSponsoredCafes] = useState<SponsoredCafe[]>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_sponsored_cafes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SPONSORED_CAFES;
  });

  // Baristas (Always 100% Free & Open)
  const [baristas, setBaristas] = useState<Barista[]>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_baristas');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load baristas from storage', e);
    }
    return INITIAL_BARISTAS;
  });

  // Jobs
  const [jobs, setJobs] = useState<JobListing[]>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_jobs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load jobs from storage', e);
    }
    return INITIAL_JOBS;
  });

  // Applications & Offers
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_applications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [directOffers, setDirectOffers] = useState<DirectOffer[]>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_offers');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Current Logged-in Barista for Personal Dashboard & Inbox
  const [currentBarista, setCurrentBarista] = useState<Barista | null>(() => {
    try {
      const saved = localStorage.getItem('cafegardee_current_barista');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [baristaDashboardOpen, setBaristaDashboardOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      if (currentBarista) {
        localStorage.setItem('cafegardee_current_barista', JSON.stringify(currentBarista));
      } else {
        localStorage.removeItem('cafegardee_current_barista');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentBarista]);
  useEffect(() => {
    try {
      localStorage.setItem('cafegardee_site_settings', JSON.stringify(siteSettings));
    } catch (e) {
      console.error(e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('cafegardee_sponsored_cafes', JSON.stringify(sponsoredCafes));
    } catch (e) {
      console.error(e);
    }
  }, [sponsoredCafes]);

  useEffect(() => {
    try {
      localStorage.setItem('cafegardee_baristas', JSON.stringify(baristas));
    } catch (e) {
      console.error(e);
    }
  }, [baristas]);

  useEffect(() => {
    try {
      localStorage.setItem('cafegardee_jobs', JSON.stringify(jobs));
    } catch (e) {
      console.error(e);
    }
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem('cafegardee_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('cafegardee_offers', JSON.stringify(directOffers));
    } catch (e) {
      console.error(e);
    }
  }, [directOffers]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('همه شهرها');
  const [selectedSkill, setSelectedSkill] = useState('همه تخصص‌ها');

  // Modals State
  const [selectedBaristaForModal, setSelectedBaristaForModal] = useState<Barista | null>(null);
  const [offerBaristaTarget, setOfferBaristaTarget] = useState<Barista | null>(null);
  const [applyJobTarget, setApplyJobTarget] = useState<JobListing | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerDefaultType, setRegisterDefaultType] = useState<'barista' | 'cafe'>('barista');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  // Handlers
  const handleOpenRegister = (type: 'barista' | 'cafe') => {
    setRegisterDefaultType(type);
    setRegisterModalOpen(true);
  };

  const handleAddBarista = (newBarista: Barista) => {
    setBaristas((prev) => [newBarista, ...prev]);
  };

  const handleAddJob = (newJob: JobListing) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleEndorseBarista = (baristaId: string) => {
    setBaristas((prev) =>
      prev.map((b) =>
        b.id === baristaId ? { ...b, endorsementsCount: b.endorsementsCount + 1 } : b
      )
    );
    if (selectedBaristaForModal && selectedBaristaForModal.id === baristaId) {
      setSelectedBaristaForModal((prev) =>
        prev ? { ...prev, endorsementsCount: prev.endorsementsCount + 1 } : null
      );
    }
  };

  const handleSubmitOffer = (offer: DirectOffer) => {
    setDirectOffers((prev) => [offer, ...prev]);
  };

  const handleSubmitApplication = (app: JobApplication) => {
    setApplications((prev) => [app, ...prev]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('همه شهرها');
    setSelectedSkill('همه تخصص‌ها');
  };

  const handleAddSponsoredCafe = (cafe: SponsoredCafe) => {
    setSponsoredCafes((prev) => [cafe, ...prev]);
  };

  const handleDeleteSponsoredCafe = (id: string) => {
    setSponsoredCafes((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateCafeNeeds = (cafeId: string, updatedFields: Partial<SponsoredCafe>) => {
    setSponsoredCafes((prev) =>
      prev.map((c) => (c.id === cafeId ? { ...c, ...updatedFields } : c))
    );
  };

  // Barista Authentication & Dashboard Handlers
  const handleBaristaLogin = (phone: string): boolean => {
    const cleanInput = phone.replace(/[\s\-\+]/g, '');
    const found = baristas.find((b) => {
      const cleanB = b.phone.replace(/[\s\-\+]/g, '');
      return cleanB.includes(cleanInput) || cleanInput.includes(cleanB);
    });
    if (found) {
      setCurrentBarista(found);
      return true;
    }
    return false;
  };

  const handleBaristaLogout = () => {
    setCurrentBarista(null);
  };

  const handleUpdateBarista = (updated: Barista) => {
    setBaristas((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setCurrentBarista(updated);
    if (selectedBaristaForModal?.id === updated.id) {
      setSelectedBaristaForModal(updated);
    }
  };

  // Direct offers & applications targeted to the current logged-in barista
  const baristaOffers = currentBarista
    ? directOffers.filter((o) => o.baristaId === currentBarista.id)
    : [];

  const baristaApplications = currentBarista
    ? applications.filter(
        (a) =>
          a.baristaPhone.replace(/[\s\-\+]/g, '') === currentBarista.phone.replace(/[\s\-\+]/g, '') ||
          a.baristaName.trim() === currentBarista.name.trim()
      )
    : [];

  const unreadOffersCount = baristaOffers.length;

  const handleExportData = () => {
    const backup = {
      domain: 'cafegardee.ir',
      founder: siteSettings.founderName,
      establishedYear: siteSettings.founderSinceYear,
      exportDate: new Date().toISOString(),
      siteSettings,
      baristas,
      jobs,
      sponsoredCafes,
      applications,
      directOffers,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cafegardee_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Intro Screen: Cinematic Black Screen with white bold Cafegardee */}
      {showIntro && (
        <IntroScreen
          onComplete={handleCompleteIntro}
          customLogoUrl={siteSettings.customLogoUrl}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegister={handleOpenRegister}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenBaristaDashboard={() => setBaristaDashboardOpen(true)}
        currentBarista={currentBarista}
        unreadOffersCount={unreadOffersCount}
        totalBaristas={baristas.length}
        totalJobs={jobs.length}
        siteSettings={siteSettings}
      />

      {/* Hero Banner Section */}
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        onOpenRegister={handleOpenRegister}
        activeTab={activeTab === 'cafes' ? 'baristas' : activeTab}
        setActiveTab={(t) => setActiveTab(t as any)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'baristas' && (
          <>
            <BaristaDirectory
              baristas={baristas}
              searchQuery={searchQuery}
              selectedCity={selectedCity}
              selectedSkill={selectedSkill}
              onSelectBarista={(barista) => setSelectedBaristaForModal(barista)}
              onSendOffer={(barista) => setOfferBaristaTarget(barista)}
              onOpenRegister={() => handleOpenRegister('barista')}
              onResetFilters={handleResetFilters}
            />

            {/* Embedded highlight of Sponsored Cafes with Smart Needs Scanner */}
            <FeaturedCafesSection
              cafes={sponsoredCafes}
              onOpenRegisterCafe={() => handleOpenRegister('cafe')}
              onUpdateCafeNeeds={handleUpdateCafeNeeds}
            />
          </>
        )}

        {activeTab === 'jobs' && (
          <JobBoard
            jobs={jobs}
            onOpenRegisterCafe={() => handleOpenRegister('cafe')}
            onApplyJob={(job) => setApplyJobTarget(job)}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        )}

        {activeTab === 'cafes' && (
          <FeaturedCafesSection
            cafes={sponsoredCafes}
            onOpenRegisterCafe={() => handleOpenRegister('cafe')}
            onUpdateCafeNeeds={handleUpdateCafeNeeds}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            totalBaristas={baristas.length}
            totalJobs={jobs.length}
            siteSettings={siteSettings}
            onOpenDonation={() => setDonationModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenRegister={handleOpenRegister}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
        siteSettings={siteSettings}
      />

      {/* Barista Detail Modal */}
      <BaristaModal
        barista={selectedBaristaForModal}
        onClose={() => setSelectedBaristaForModal(null)}
        onSendOffer={(barista) => setOfferBaristaTarget(barista)}
        onEndorse={handleEndorseBarista}
      />

      {/* Register Barista / Cafe Job Modal */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        defaultType={registerDefaultType}
        onAddBarista={handleAddBarista}
        onAddJob={handleAddJob}
        onLoginBarista={(barista) => {
          setCurrentBarista(barista);
        }}
      />

      {/* Barista Dashboard & Offers Inbox Modal */}
      <BaristaDashboardModal
        isOpen={baristaDashboardOpen}
        onClose={() => setBaristaDashboardOpen(false)}
        currentBarista={currentBarista}
        onLogin={handleBaristaLogin}
        onLogout={handleBaristaLogout}
        onUpdateBarista={handleUpdateBarista}
        offers={baristaOffers}
        applications={baristaApplications}
        onOpenRegister={() => {
          setBaristaDashboardOpen(false);
          handleOpenRegister('barista');
        }}
      />

      {/* Send Job Offer to Barista Modal */}
      <SendOfferModal
        barista={offerBaristaTarget}
        onClose={() => setOfferBaristaTarget(null)}
        onSubmitOffer={handleSubmitOffer}
      />

      {/* Apply to Cafe Job Modal */}
      <ApplyJobModal
        job={applyJobTarget}
        onClose={() => setApplyJobTarget(null)}
        onSubmitApplication={handleSubmitApplication}
      />

      {/* Admin Panel Modal (Upload Logo & Settings & Logout & Recovery & Backup) */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        siteSettings={siteSettings}
        onUpdateSettings={(newSettings) => setSiteSettings(newSettings)}
        sponsoredCafes={sponsoredCafes}
        onAddSponsoredCafe={handleAddSponsoredCafe}
        onDeleteSponsoredCafe={handleDeleteSponsoredCafe}
        onExportData={handleExportData}
        onReplayIntro={handleReplayIntro}
      />

      {/* Donation / Support Modal (Direct Hamibash https://hamibash.com/cafegardee) */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />

    </div>
  );
}
