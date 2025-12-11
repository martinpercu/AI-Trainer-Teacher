import { Works, Certification, Education } from './resume';

export interface Ownresume {
  resumeId?: string;
  recruiterId: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  zipcode?: string;
  summary?: string;
  skills?: string[];
  languages?: string[];
  works?: Works[];
  certifications?: Certification[];
  education?: Education[];
}
