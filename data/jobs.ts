// Centralized destination + job + marketing asset data.
// All pages should read from this file so image paths and content
// stay synchronized.
//
// IMPORTANT:
// All image paths below are based on the files currently inside:
// public/images/countries
// public/images/jobs
// public/images/postas
// public/images/design

export interface Destination {
  name: string;
  slug: string;

  /** Large hero photo used on destination detail pages */
  heroImage: string;

  /** Smaller image used on cards/list views */
  thumbImage: string;

  /** Short description */
  blurb: string;

  /** Whether this destination is currently displayed */
  active: boolean;
}

/* =========================================================
   DESTINATIONS
   ========================================================= */

export const destinations: Destination[] = [
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    heroImage: "/images/countries/welcometosaudi.png",
    thumbImage: "/images/countries/saudiarabia.png",
    blurb:
      "Household, hospitality and general employment opportunities across Saudi Arabia.",
    active: true,
  },

  {
    name: "United Arab Emirates",
    slug: "uae",
    heroImage: "/images/countries/dubaicity.png",
    thumbImage: "/images/countries/dubai.png",
    blurb:
      "Opportunities across Dubai and the wider United Arab Emirates, depending on current demand.",
    active: true,
  },

  {
    name: "Qatar",
    slug: "qatar",
    heroImage: "/images/countries/qatar.png",
    thumbImage: "/images/countries/qataar.png",
    blurb:
      "One of our most active destinations, with household, driving, caregiving, hospitality and other opportunities.",
    active: true,
  },

  {
    name: "Kuwait",
    slug: "kuwait",
    heroImage: "/images/countries/kuwaitcity.png",
    thumbImage: "/images/countries/kuwait.png",
    blurb:
      "Household, hospitality and general employment opportunities across Kuwait.",
    active: true,
  },

  {
    name: "Bahrain",
    slug: "bahrain",
    heroImage: "/images/countries/manamabahrain.png",
    thumbImage: "/images/countries/bahrain.png",
    blurb:
      "Household and general employment opportunities across Bahrain, depending on current demand.",
    active: true,
  },

  {
    name: "Oman",
    slug: "oman",
    heroImage: "/images/countries/muscat.png",
    thumbImage: "/images/countries/musact.png",
    blurb:
      "Household, hospitality and general employment opportunities across Oman.",
    active: true,
  },

  {
    name: "Greece",
    slug: "greece",
    heroImage: "/images/countries/greece.png",
    thumbImage: "/images/countries/greece.png",
    blurb:
      "International employment opportunities in Greece, depending on current recruitment demand.",
    active: true,
  },

  {
    name: "Luxembourg",
    slug: "luxembourg",
    heroImage: "/images/countries/luxembourg.png",
    thumbImage: "/images/countries/luxembourg.png",
    blurb:
      "International employment opportunities in Luxembourg, subject to current vacancies.",
    active: true,
  },
];

export function getDestinationBySlug(
  slug: string
): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

/* =========================================================
   JOB CATEGORIES
   ========================================================= */

export interface JobCategory {
  title: string;
  category: string;
  image: string;
}

/**
 * Main job/category images.
 *
 * These correspond to the images in:
 * public/images/jobs
 */
export const jobCategories: JobCategory[] = [
  {
    title: "Caregivers",
    category: "Caregiving",
    image: "/images/jobs/caregiver.png",
  },

  {
    title: "Men Caregivers",
    category: "Caregiving",
    image: "/images/jobs/mencaregivers.png",
  },

  {
    title: "Cooks & Kitchen Assistants",
    category: "Hospitality",
    image: "/images/jobs/cheef.png",
  },

  {
    title: "Cooks",
    category: "Hospitality",
    image: "/images/jobs/cook.png",
  },

  {
    title: "House Maids",
    category: "Household",
    image: "/images/jobs/cleaner.png",
  },

  {
    title: "House Maids",
    category: "Household",
    image: "/images/jobs/cleanerdesign2.png",
  },

  {
    title: "Cleaners",
    category: "Cleaning",
    image: "/images/jobs/mencleaners.png",
  },

  {
    title: "Male Cleaners",
    category: "Cleaning",
    image: "/images/postas/male cleaner.png",
  },

  {
    title: "Male Cooks",
    category: "Hospitality",
    image: "/images/postas/male cooks.png",
  },

  {
    title: "Drivers",
    category: "Driving",
    image: "/images/jobs/drivers.png",
  },

  {
    title: "Female Drivers",
    category: "Driving",
    image: "/images/jobs/driverslady.png",
  },

  {
    title: "Cleaner + Driver",
    category: "Cleaning & Driving",
    image: "/images/jobs/combineddriverfemale.png",
  },

  {
    title: "Security Guards",
    category: "Security",
    image: "/images/jobs/mensecurityofficers.png",
  },

  {
    title: "General Roles",
    category: "Various",
    image: "/images/jobs/men.png",
  },

  {
    title: "Warehouse Helpers",
    category: "Warehouse",
    image: "/images/jobs/warehouse.png",
  },

  {
    title: "Home Tutors",
    category: "Education",
    image: "/images/postas/HomeTutorQatar.png",
  },

  {
    title: "IT Jobs",
    category: "Technology",
    image: "/images/postas/ITQatar.png",
  },

  {
    title: "Beauticians",
    category: "Beauty",
    image: "/images/postas/beautyqatar.png",
  },

  {
    title: "Zookeeper",
    category: "General",
    image: "/images/postas/zookeeperqatar.png",
  },
];

/* =========================================================
   ADDITIONAL JOB / RECRUITMENT POSTERS
   ========================================================= */

/**
 * These are marketing/recruitment posters inside:
 * public/images/postas
 *
 * They can be used in:
 * - Homepage poster sections
 * - Job detail pages
 * - Recruitment carousel
 * - WhatsApp/share sections
 * - Latest opportunities
 */

export interface RecruitmentPoster {
  title: string;
  image: string;
  category: string;
  country?: string;
}

export const recruitmentPosters: RecruitmentPoster[] = [
  {
    title: "Caregiver Jobs",
    image: "/images/postas/caregiver.png",
    category: "Caregiving",
    country: "Qatar",
  },

  {
    title: "Chef Jobs",
    image: "/images/postas/cheef.png",
    category: "Hospitality",
    country: "Qatar",
  },

  {
    title: "Cleaner Jobs",
    image: "/images/postas/cleanercool.png",
    category: "Cleaning",
  },

  {
    title: "House Maid Jobs",
    image: "/images/postas/cleanerdesign2.png",
    category: "Household",
  },

  {
    title: "Cleaner + Driver",
    image: "/images/postas/combineddriver.png",
    category: "Cleaning & Driving",
  },

  {
    title: "Cook Jobs",
    image: "/images/postas/cook.png",
    category: "Hospitality",
  },

  {
    title: "Care Worker Jobs",
    image: "/images/postas/coolcare.png",
    category: "Caregiving",
  },

  {
    title: "Driver Jobs",
    image: "/images/postas/drivers.png",
    category: "Driving",
  },

  {
    title: "Female Driver Jobs",
    image: "/images/postas/driverslady.png",
    category: "Driving",
  },

  {
    title: "Home Tutor Jobs",
    image: "/images/postas/HomeTutorQatar.png",
    category: "Education",
    country: "Qatar",
  },

  {
    title: "IT Jobs in Qatar",
    image: "/images/postas/ITQatar.png",
    category: "Technology",
    country: "Qatar",
  },

  {
    title: "Male Cleaner Jobs",
    image: "/images/postas/male cleaner.png",
    category: "Cleaning",
  },

  {
    title: "Male Cook Jobs",
    image: "/images/postas/male cooks.png",
    category: "Hospitality",
  },

  {
    title: "Male Cleaner Jobs",
    image: "/images/postas/maleclean.png",
    category: "Cleaning",
  },

  {
    title: "General Jobs",
    image: "/images/postas/men.png",
    category: "Various",
  },

  {
    title: "Male Caregiver Jobs",
    image: "/images/postas/mencaregivers.png",
    category: "Caregiving",
  },

  {
    title: "Male Cleaner Jobs",
    image: "/images/postas/mencleaners.png",
    category: "Cleaning",
  },

  {
    title: "Security Officer Jobs",
    image: "/images/postas/mensecurityofficers.png",
    category: "Security",
  },

  {
    title: "Beauty Jobs in Qatar",
    image: "/images/postas/qatarbeauty.png",
    category: "Beauty",
    country: "Qatar",
  },

  {
    title: "Combined Jobs",
    image: "/images/postas/qatarcombined.png",
    category: "Various",
    country: "Qatar",
  },

  {
    title: "Tutor Jobs in Qatar",
    image: "/images/postas/qatartutor.png",
    category: "Education",
    country: "Qatar",
  },

  {
    title: "Qatar Recruitment",
    image: "/images/postas/qatarposta.png",
    category: "Recruitment",
    country: "Qatar",
  },

  {
    title: "Recruitment Opportunities",
    image: "/images/postas/recruitflayer.png",
    category: "Recruitment",
  },

  {
    title: "Warehouse Jobs",
    image: "/images/postas/warehouse.png",
    category: "Warehouse",
  },

  {
    title: "General Worker Jobs",
    image: "/images/postas/woorker.png",
    category: "General",
  },

  {
    title: "Zookeeper Jobs in Qatar",
    image: "/images/postas/zookeeperqatar.png",
    category: "General",
    country: "Qatar",
  },
];

/* =========================================================
   DESIGN / HERO IMAGES
   ========================================================= */

export interface DesignImage {
  name: string;
  image: string;
  alt: string;
}

export const designImages: DesignImage[] = [
  {
    name: "Global Recruitment",
    image: "/images/design/image1.png",
    alt: "Global recruitment and international travel",
  },

  {
    name: "International Opportunities",
    image: "/images/design/image2.png",
    alt: "International employment opportunities",
  },

  {
    name: "Travel Abroad",
    image: "/images/design/image3.png",
    alt: "Travel and employment abroad",
  },

  {
    name: "Airport Travel",
    image: "/images/design/image5.png",
    alt: "Airport travel",
  },

  {
    name: "Airplane",
    image: "/images/design/plane.png",
    alt: "Airplane in the sky",
  },

  {
    name: "Airline",
    image: "/images/design/planemain.png",
    alt: "Airline aircraft",
  },

  {
    name: "Flight",
    image: "/images/design/sexyplane.png",
    alt: "Aircraft arriving at an airport",
  },
];

/* =========================================================
   STRUCTURED JOB LISTINGS
   ========================================================= */

export interface Job {
  slug: string;
  title: string;
  countrySlug: string;
  country: string;
  category: string;
  salary: string;
  benefits: string[];
  image: string;
  status: "active";
}

const QATAR_BENEFITS = [
  "Accommodation provided",
  "Food provided",
  "Health insurance provided",
  "Off days as per employer agreement",
  "Vacation as per Qatar Labour Law",
];

export const jobs: Job[] = [
  {
    slug: "house-help-experienced-cooks-qatar",
    title: "House Help — Experienced Cooks",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Household",
    salary: "1,200 QAR",
    benefits: QATAR_BENEFITS,
    image: "/images/jobs/cheef.png",
    status: "active",
  },

  {
    slug: "house-help-first-time-qatar",
    title: "House Help — First Time",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Household",
    salary: "900 – 1,000 QAR",
    benefits: QATAR_BENEFITS,
    image: "/images/jobs/cleaner.png",
    status: "active",
  },

  {
    slug: "house-drivers-qatar",
    title: "House Drivers",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Driving",
    salary: "1,200 QAR during training · 1,600 QAR after training",
    benefits: QATAR_BENEFITS,
    image: "/images/jobs/drivers.png",
    status: "active",
  },

  {
    slug: "nannys-qatar",
    title: "Nannys",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Childcare",
    salary: "1,200 – 1,400 QAR",
    benefits: QATAR_BENEFITS,
    image: "/images/jobs/driverslady.png",
    status: "active",
  },

  {
    slug: "home-tutors-qatar",
    title: "Home Tutors",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Education",
    salary: "1,500 – 1,600 QAR",
    benefits: QATAR_BENEFITS,
    image: "/images/postas/Home Tutor Jobs in Qatar.png",
    status: "active",
  },

  {
    slug: "caregivers-qatar",
    title: "Caregivers",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Caregiving",
    salary: "1,500 QAR",
    benefits: QATAR_BENEFITS,
    image: "/images/jobs/caregiver.png",
    status: "active",
  },

  {
    slug: "beauticians-qatar",
    title: "Beauticians",
    countrySlug: "qatar",
    country: "Qatar",
    category: "Beauty",
    salary: "1,500 – 1,600 QAR",
    benefits: QATAR_BENEFITS,
    image: "/images/postas/beautyqatar.png",
    status: "active",
  },
];

/* =========================================================
   JOB HELPERS
   ========================================================= */

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

export function getJobsByCountrySlug(countrySlug: string): Job[] {
  return jobs.filter((job) => job.countrySlug === countrySlug);
}

export function getPostersByCategory(
  category: string
): RecruitmentPoster[] {
  return recruitmentPosters.filter(
    (poster) => poster.category === category
  );
}

export function getPostersByCountry(
  country: string
): RecruitmentPoster[] {
  return recruitmentPosters.filter(
    (poster) => poster.country === country
  );
}

/* =========================================================
   RECRUITMENT PROCESS
   ========================================================= */

export const RECRUITMENT_PROCESS = [
  {
    step: "Application",
    detail:
      "You apply for an opportunity — no account required.",
  },

  {
    step: "Screening",
    detail:
      "Our recruitment team reviews your details and experience.",
  },

  {
    step: "Interview",
    detail:
      "Qualifying candidates are interviewed, where the role requires it.",
  },

  {
    step: "Documentation",
    detail:
      "We guide you through the documents your specific opportunity needs.",
  },

  {
    step: "Medical / required checks",
    detail:
      "Completed where required for your destination and role.",
  },

  {
    step: "Pre-departure preparation",
    detail:
      "Briefing and preparation ahead of travel.",
  },

  {
    step: "Deployment",
    detail:
      "You travel to begin the confirmed opportunity.",
  },
];