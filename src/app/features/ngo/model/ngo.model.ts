import { User } from 'src/app/auth/data_access/auth.state.service';
import { Project } from '../../projects/model/project.model';

export interface BusinessArea {
  name: string;
  id: number;
}

export type LegalStatusNGO = 'A' | 'B';

export interface NGO {
  id: string;
  name: string;
  owners: User[];
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: string[];
  creationDate: string;
  description: string;
  businnesAreas: BusinessArea[];
  KRS: string;
  NIP: string;
  resources: string[];
  legalStatus: LegalStatusNGO;
  // donors: Company[];
  employees: User[];
  projects: Project[];
  tags: string[];
}
