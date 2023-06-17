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
  category: BusinessCategory[];
}
