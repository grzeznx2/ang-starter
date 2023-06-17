export interface Offer {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  closeDeadline: boolean;
  scope: string;
  categories: { id: number; name: string }[];
}
