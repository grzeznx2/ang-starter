import { BusinessArea } from '../../ngo/model/ngo.model';

export const PROJECT_STATUS = {
  IN_PREPARATION: 'IN_PREPARATION',
  PLANNED: 'PLANNED',
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
