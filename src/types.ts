export type AvailabilityType = 'fulltime' | 'parttime' | 'consulting' | 'shift';

export interface Barista {
  id: string;
  name: string;
  gender?: 'male' | 'female';
  roleTitle: string;
  city: string;
  neighborhood: string;
  experienceYears: number;
  availability: AvailabilityType;
  bio: string;
  skills: string[];
  machines: string[];
  previousCafes: string[];
  certifications: string[];
  avatarUrl: string;
  phone: string;
  telegram: string;
  instagram: string;
  verified: boolean;
  rating: number;
  endorsementsCount: number;
  createdAt: string;
  isCustom?: boolean;
}

export interface JobListing {
  id: string;
  cafeName: string;
  title: string;
  city: string;
  neighborhood: string;
  employmentType: 'fulltime' | 'parttime' | 'shift' | 'internship';
  salaryRange: string;
  shifts: string;
  perks: string[];
  machinesInCafe: string[];
  requiredSkills: string[];
  minExperienceYears: number;
  description: string;
  phone: string;
  telegram: string;
  createdAt: string;
  urgent: boolean;
  isCustom?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  cafeName: string;
  baristaName: string;
  baristaPhone: string;
  message: string;
  submittedAt: string;
}

export interface DirectOffer {
  id: string;
  baristaId: string;
  baristaName: string;
  cafeName: string;
  senderPhone: string;
  offerDetails: string;
  proposedSalary: string;
  submittedAt: string;
}

export interface SponsoredCafe {
  id: string;
  name: string;
  tagline: string;
  city: string;
  neighborhood: string;
  featuredImageUrl: string;
  specialtyCoffee: string;
  machine: string;
  discountOffer?: string;
  hiringNow: boolean;
  websiteOrInstagram: string;
  phone: string;
  isSponsored: boolean;
  lastScanTime?: string;
  detectedNeeds?: string[];
  storyHighlight?: string;
}

export interface SiteSettings {
  customLogoUrl: string | null;
  siteName: string;
  tagline: string;
  founderName: string;
  founderSinceYear: number;
  adminEmail: string;
}
