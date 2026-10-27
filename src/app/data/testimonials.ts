/** Professional contacts supplied by the portfolio owner.
 * No quotations or endorsements are implied or attributed.
 */
export interface ProfessionalContact {
  id: string;
  name: string;
  title: string;
  organization?: string;
  initials: string;
}

export const professionalContacts: ProfessionalContact[] = [
  {
    id: "halefom-hailu",
    name: "Halefom Hailu",
    title: "CEO",
    organization: "Memi Trading PLC",
    initials: "HH",
  },
  {
    id: "dr-assefa",
    name: "Dr. Assefa",
    title: "AI/ML Researcher",
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
