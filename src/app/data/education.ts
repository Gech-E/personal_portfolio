export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  score: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export const educationData: Education[] = [
  {
    id: "beng",
    degree: "B.Sc. in Electrical and Computer Engineering",
    institution: "Mekelle University",
    startDate: "2019",
    endDate: "2024",
    score: "CGPA: 3.93/4.00 (Great Distinction)",
    achievements: [
      "Graduated with Great Distinction",
      "Scored highly on the National Exit Exam",
      "Led the Born to Win Tech Club as Program Coordinator",
      "Completed comprehensive capstone project on AI-driven diagnostics"
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: "ml-specialization",
    name: "Machine Learning Specialization",
    issuer: "Coursera (Stanford University / DeepLearning.AI)",
    date: "2024"
  },
  {
    id: "full-stack",
    name: "Full-Stack Web Developer",
    issuer: "Udacity",
    date: "2023"
  },
  {
    id: "cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024"
  }
];
