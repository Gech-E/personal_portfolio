export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarPlaceholder: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    quote: "Getachew's ability to seamlessly bridge complex machine learning models with robust full-stack applications is truly exceptional. He delivers production-ready AI solutions faster than anyone I've worked with.",
    name: "Sarah Jenkins",
    title: "Director of Engineering",
    company: "TechNova Systems",
    avatarPlaceholder: "SJ"
  },
  {
    id: "t2",
    quote: "As a CTO, Getachew demonstrated not just technical brilliance, but the leadership required to align our technical roadmap with our business objectives. He's a rare talent who understands both systems and people.",
    name: "Marcus Dawit",
    title: "CEO",
    company: "Gemed Solutions",
    avatarPlaceholder: "MD"
  },
  {
    id: "t3",
    quote: "The anomaly detection model Getachew built for us improved our QA process accuracy by 40%. His innovative approach to contrastive learning saved us months of manual data labeling.",
    name: "Elena Rodriguez",
    title: "Lead Data Scientist",
    company: "Memi Trading PLC",
    avatarPlaceholder: "ER"
  }
];
