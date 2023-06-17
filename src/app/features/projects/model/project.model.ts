import { BusinessArea } from '../../ngo/model/ngo.model';

export const PROJECT_STATUS = {
  IDEA: 'IDEA',
  PLANNED: 'PLANNED',
  OBTAINING_FINANCING: 'OBTAINING_FINANCING',
  IN_SETTLEMENT: 'IN_SETTLEMENT',
  IN_PROMOTION: 'IN_PROMOTION',
  IN_PROGRESS: 'IN_SETTLEMENT',
  COMPLETED: 'COMPLETED',
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUS;

export interface Project {
  id: string;
  name: string;
  description: string;
  startTime: string;
  address: string;
  endTime: string;
  budget: number;
  status: ProjectStatus;
  tags: string[];
  imageLink: string;
  link: string;
  cooperationMessage?: string;
  possibleVolunteer: boolean;
  category: BusinessArea[];
}

export interface NGOProject extends Project {
  ngoId: string;
  ngoName: string;
}
