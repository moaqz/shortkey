export interface Link {
  id: number;
  destinationUrl: string;
  slug: string;
  userId: string;
  totalClicks: number;
  lastClicked: string | null;
  createdAt: string;
  updatedAt: string;
};
