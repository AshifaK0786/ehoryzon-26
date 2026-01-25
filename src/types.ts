export interface Event {
  slug: string;
  title: string;
  date: string | null;
  image: string;
  registerUrl: string;
  qrImage: string;
  maxTeamMembers: number;
  category?: "intra" | "inter" | "workshop" | "arts";
  descriptionLines: string[];
  guidelinesFile?: string;
  contactLeft: string;
  contactRight: string;
  contactLeftName: string;
  contactRightName: string;
  whatsappLink: string;
}

export interface Person {
  name: string;
  roll: string;
  department: string;
  year: string;
  mobile: string;
  email: string;
  collegeType?: "intra" | "inter";
  collegeName?: string;
}