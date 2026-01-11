/**
 * Shared constants for QUT LITS website
 */

// External URLs
export const URLS = {
  membership: 'https://campus.hellorubric.com/?tab=memberships&s=6719',
  facebook: 'https://www.facebook.com/lawinnovationandtechsociety/',
  instagram: 'https://www.instagram.com/qutlitsociety/',
  linkedin: 'https://www.linkedin.com/company/law-innovation-and-technology-society/',
  email: 'mailto:litsociety@qut.edu.au',
  prospectus: '/LITS 2026 Prospectus.pdf',
};

// Contact information
export const CONTACT = {
  email: 'litsociety@qut.edu.au',
  location: 'QUT Gardens Point Campus, Brisbane, QLD',
};

// Social links configuration (for Footer and other components)
export const SOCIAL_LINKS = [
  { 
    name: 'Facebook', 
    href: URLS.facebook, 
    ariaLabel: 'Visit our Facebook page',
  },
  { 
    name: 'Instagram', 
    href: URLS.instagram, 
    ariaLabel: 'Follow us on Instagram',
  },
  { 
    name: 'LinkedIn', 
    href: URLS.linkedin, 
    ariaLabel: 'Connect with us on LinkedIn',
  },
  { 
    name: 'Email', 
    href: URLS.email, 
    ariaLabel: 'Send us an email',
  },
];

// Animation defaults for consistency
export const ANIMATION = {
  tilt: {
    subtle: { maxTilt: 2, scale: 1.01 },
    default: { maxTilt: 3, scale: 1.02 },
    interactive: { maxTilt: 4, scale: 1.02 },
  },
  transition: {
    fast: { duration: 0.2 },
    default: { duration: 0.3 },
    slow: { duration: 0.5 },
  },
};

// Branding
export const BRANDING = {
  name: 'QUT LITS',
  fullName: 'QUT Law, Innovation and Technology Society',
  tagline: "QUT's Premier Society for Law and Technology",
  description: 'Empowering students to become the next generation of legal tech innovators and tech law pioneers.',
};
