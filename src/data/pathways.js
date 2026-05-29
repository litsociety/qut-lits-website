// ============================================================================
// LITS Pathways data
// ============================================================================
// Draft. Every program and certification below is real and links to its
// official page (links verified). The selection and ordering are a starting
// point to refine with our industry partners.
// ============================================================================

export const MOCK_NOTE =
  "Draft. The programs and certifications shown are real; the selection and order are a starting point to refine with our industry partners.";

// Providers. Sponsors and certification bodies/university, used to attribute
// each milestone ("Offered by" / "Issued by").
const PROVIDERS = {
  ashurst: { name: "Ashurst" },
  claytonUtz: { name: "Clayton Utz" },
  pwc: { name: "PwC" },
  relativity: { name: "Relativity" },
  nuix: { name: "Nuix" },
  iapp: { name: "IAPP" },
  qut: { name: "QUT" },
};

export function resolveProvider(key) {
  return PROVIDERS[key] || { name: key };
}

export const IMPORTANCE_META = {
  optional: { label: "Optional" },
  recommended: { label: "Recommended" },
  essential: { label: "Essential" },
};

export const PATHWAYS = {
  "legal-tech": {
    slug: "legal-tech",
    title: "Legal Tech",
    tagline: "Build and run the technology that legal work depends on",
    blurb:
      "Build and run the technology behind legal work, from e-discovery and forensic technology to legal operations. Many roles sit alongside lawyers rather than requiring admission.",
    stages: [
      {
        phase: "Foundations",
        when: "Years 1 to 2",
        summary:
          "Take the QUT minor if you study law, and start the free Relativity certifications you can do in your own time.",
        milestones: [
          {
            type: "study",
            title: "QUT Law, Technology and Innovation Minor",
            importance: "recommended",
            provider: "qut",
            url: "https://www.qut.edu.au/courses/bachelor-of-laws-honours#structure-contents-138611",
            detail:
              "Law students only. A QUT minor covering technology law, data privacy and cybersecurity, legal coding, smart contracts, AI governance and IP.",
          },
          {
            type: "cert",
            title: "RelativityOne Certified Pro",
            importance: "recommended",
            provider: "relativity",
            url: "https://www.relativity.com/resources/certification/pro/relativityone-certified-pro/",
            detail:
              "Free, beginner certification in RelativityOne, the e-discovery platform used across large disputes practices.",
          },
          {
            type: "cert",
            title: "RelativityOne Review Pro",
            importance: "recommended",
            provider: "relativity",
            url: "https://www.relativity.com/resources/certification/pro/relativityone-review-pro/",
            detail: "Free follow-on to Certified Pro, focused on the document review workflow.",
          },
        ],
      },
      {
        phase: "Clerkship season",
        when: "Penultimate year",
        summary:
          "Clerkship and vacation applications open in mid-July and close in early August. Target forensic technology and e-discovery teams.",
        milestones: [
          {
            type: "clerkship",
            title: "Clayton Utz Seasonal Clerkship",
            importance: "essential",
            provider: "claytonUtz",
            url: "https://www.claytonutz.com/careers/early-careers",
            detail:
              "Penultimate-year clerkship at a firm with forensic technology and e-discovery work you can be exposed to.",
          },
          {
            type: "clerkship",
            title: "PwC Vacationer Program",
            importance: "essential",
            provider: "pwc",
            url: "https://jobs-au.pwc.com/au/en/vacation-program",
            detail:
              "Paid vacation program; the Technology & AI and forensic teams cover e-discovery, cyber and analytics.",
          },
          {
            type: "cert",
            title: "Nuix Workstation Forensic Practitioner",
            importance: "optional",
            provider: "nuix",
            url: "https://www.nuix.com/training/nuix-workstation-forensic-practitioner-certification",
            detail: "Vendor certification in Nuix, a forensic and e-discovery platform used in disputes practices.",
          },
        ],
      },
      {
        phase: "Graduate and beyond",
        when: "Final year onward",
        summary:
          "Graduate offers usually flow from clerkships. The advanced Relativity credential marks you out as a specialist.",
        milestones: [
          {
            type: "grad",
            title: "Clayton Utz Graduate Program",
            importance: "essential",
            provider: "claytonUtz",
            url: "https://www.claytonutz.com/careers/early-careers",
            detail: "Graduate program; most graduate roles are offered to former clerks.",
          },
          {
            type: "grad",
            title: "PwC Graduate Program",
            importance: "essential",
            provider: "pwc",
            url: "https://jobs-au.pwc.com/au/en/graduate-program",
            detail: "Graduate program with Technology & AI and forensic streams.",
          },
          {
            type: "cert",
            title: "Relativity Certified Administrator (RCA)",
            importance: "recommended",
            provider: "relativity",
            url: "https://www.relativity.com/resources/certification/admin/relativity-certified-administrator",
            detail:
              "Advanced, experience-based Relativity certification and one of the most respected credentials in e-discovery.",
          },
        ],
      },
    ],
  },

  "tech-law": {
    slug: "tech-law",
    title: "Tech Law",
    tagline: "Practise law in the areas technology is reshaping",
    blurb:
      "Practise law in technology-driven areas such as IP, privacy, cyber and AI governance, through the clerkship to graduate-lawyer route.",
    stages: [
      {
        phase: "Foundations",
        when: "Years 1 to 2",
        summary:
          "Take the QUT minor, and get early experience: some firms run programs for pre-penultimate students.",
        milestones: [
          {
            type: "study",
            title: "QUT Law, Technology and Innovation Minor",
            importance: "recommended",
            provider: "qut",
            url: "https://www.qut.edu.au/courses/bachelor-of-laws-honours#structure-contents-138611",
            detail:
              "Law students only. A QUT minor covering technology law, data privacy and cybersecurity, legal coding, smart contracts, AI governance and IP.",
          },
          {
            type: "clerkship",
            title: "Clayton Utz Career Launch Program",
            importance: "recommended",
            provider: "claytonUtz",
            url: "https://www.claytonutz.com/careers/early-careers",
            detail: "An early program for pre-penultimate law students considering a career in commercial law.",
          },
          {
            type: "role",
            title: "Clayton Utz Student Paralegal",
            importance: "optional",
            provider: "claytonUtz",
            url: "https://www.claytonutz.com/careers/early-careers",
            detail: "Casual roles for law students to build legal experience at a leading firm.",
          },
        ],
      },
      {
        phase: "Clerkship season",
        when: "Penultimate year",
        summary:
          "The main clerkship round, mid-July to early August. Target IP, technology, privacy and disputes practices.",
        milestones: [
          {
            type: "clerkship",
            title: "Ashurst Seasonal Clerkship Program",
            importance: "essential",
            provider: "ashurst",
            url: "https://www.ashurst.com/en/careers/students-and-graduates/australia-clerkship/",
            detail: "Clerkship at a global firm; target the digital economy, IP and technology, and disputes practices.",
          },
          {
            type: "clerkship",
            title: "Clayton Utz Seasonal Clerkship",
            importance: "essential",
            provider: "claytonUtz",
            url: "https://www.claytonutz.com/careers/early-careers",
            detail: "Penultimate-year clerkship with rotations through technology, IP, privacy or disputes teams.",
          },
          {
            type: "clerkship",
            title: "PwC Vacationer Program",
            importance: "recommended",
            provider: "pwc",
            url: "https://jobs-au.pwc.com/au/en/vacation-program",
            detail: "Vacation program; the Tax & Legal practice includes PwC Legal's technology and privacy work.",
          },
        ],
      },
      {
        phase: "Graduate and beyond",
        when: "Final year onward",
        summary:
          "Graduate programs include Practical Legal Training, so you qualify while you work. Privacy and AI credentials come next.",
        milestones: [
          {
            type: "grad",
            title: "Ashurst Graduate Program",
            importance: "essential",
            provider: "ashurst",
            url: "https://www.ashurst.com/en/careers/students-and-graduates/",
            detail:
              "Graduate program that includes an in-house Practical Legal Training course, so you qualify while you work.",
          },
          {
            type: "grad",
            title: "Clayton Utz Graduate Program",
            importance: "essential",
            provider: "claytonUtz",
            url: "https://www.claytonutz.com/careers/early-careers",
            detail: "Rotational graduate-lawyer program; choose technology-facing rotations.",
          },
          {
            type: "cert",
            title: "IAPP CIPP (Certified Information Privacy Professional)",
            importance: "recommended",
            provider: "iapp",
            url: "https://iapp.org/certify/cipp/",
            detail: "The premier privacy law credential, and the standard for privacy lawyers.",
          },
          {
            type: "cert",
            title: "IAPP AIGP (Artificial Intelligence Governance Professional)",
            importance: "recommended",
            provider: "iapp",
            url: "https://iapp.org/certify/aigp/",
            detail: "Credential for AI governance, an emerging area of technology-law practice.",
          },
        ],
      },
    ],
  },
};

export const PATHWAY_ORDER = ["legal-tech", "tech-law"];
