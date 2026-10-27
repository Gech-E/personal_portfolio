/**
 * Professional references identified by the portfolio owner.
 * No fabricated direct testimonials: Dr. Assefa and Dr. Sisay have
 * not supplied attributed statements. The submitted Halefom certificate
 * displays a future date (2026-12-03), so it is labeled as unverified.
 */
export interface ProfessionalContact {
  id: string;
  name: string;
  title: string;
  organization: string;
  initials: string;
  recognition?: string;
  evidenceNote?: string;
}

export const professionalContacts: ProfessionalContact[] = [
  {
    id: "halefom-hailu",
    name: "Halefom Hailu Berhe",
    title: "Founder & CEO",
    organization: "Memi Trading PLC",
    initials: "HH",
    recognition:
      "The submitted Certificate of Contribution describes Getachew's work coordinating AI/ML interns and preparing Zemen Bazaar vendor-recommendation data through collection, cleaning, preprocessing, and feature engineering.",
    evidenceNote:
      "Certificate image submitted by portfolio owner; dated December 3, 2026 (a future date). Issuance and endorsement are not independently verified.",
  },
  {
    id: "dr-assefa",
    name: "Dr. Assefa",
    title: "AI/ML Researcher",
    organization: "Memi Trading PLC",
    initials: "DA",
  },
  {
    id: "dr-sisay",
    name: "Dr. Sisay",
    title: "Cybersecurity Researcher & CTO",
    organization: "Memi Trading PLC",
    initials: "DS",
  },
];
