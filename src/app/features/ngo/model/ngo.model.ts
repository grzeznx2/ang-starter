import { User } from 'src/app/auth/data_access/auth.state.service';
import { Company } from '../../companies/model/company.model';
import { Project } from '../../projects/model/project.model';

export interface BusinessArea {}

export type LegalStatusNGO = 'A' | 'B';

export interface NGO {
  id: string;
  name: string;
  owners: User[];
  address: string;
  phone: string;
  eMail: string;
  website: string;
  socialLinks: string[];
  creationDate: string;
  description: string;
  businnesAreas: BusinessArea[];
  KRS: string;
  NIP: string;
  resources: string[];
  legalStatus: LegalStatusNGO;
  donors: Company[];
  employees: User[];
  projects: Project[];
}
