/**
 * Professional recognition and reference details provided by portfolio owner.
 * Only the certificate contains source text. The two researcher profiles are
 * not quotations or verified endorsements.
 */
export interface ProfessionalReference {
  id: string;
  name: string;
  role: string;
  organization: string;
  initials: string;
  context: string;
  sourceType: "certificate" | "professional-contact";
  certificateExcerpt?: string;
  documentStatus?: string;
}

export const testimonialsData: ProfessionalReference[] = [
  {
    id: "halefom-hailu",
    name: "Halefom Hailu Berhe",
    role: "Founder & CEO",
    organization: "Memi Trading PLC",
    initials: "HH",
    sourceType: "certificate",
    certificateExcerpt: "In recognition of your distinguished Contribution",
    context:
      "A submitted Memi Trading Certificate of Contribution credits Getachew's team leadership, coordination of AI/ML interns, and work on Zemen Bazaar's vendor recommendation project—including vendor/user data collection, data cleaning, preprocessing, and feature engineering.",
    documentStatus:
      "Source: owner-submitted certificate bearing Halefom Hailu Berhe's name and signature. The document is dated December 3, 2026, which is after the current date; issuance and endorsement remain unverified.",
  },
  {
    id: "dr-assefa",
    name: "Dr. Assefa",
    role: "AI/ML Researcher",
    organization: "Memi Trading PLC",
    initials: "DA",
    sourceType: "professional-contact",
    context:
      "Listed by Getachew as an AI/ML research professional at Memi Trading PLC. A personal testimonial statement has not yet been provided or approved.",
  },
  {
    id: "dr-sisay",
    name: "Dr. Sisay",
    role: "Cybersecurity Researcher & CTO",
    organization: "Memi Trading PLC",
    initials: "DS",
    sourceType: "professional-contact",
    context:
      "Listed by Getachew as a cybersecurity researcher and technical leader at Memi Trading PLC. A personal testimonial statement has not yet been provided or approved.",
  },
];
