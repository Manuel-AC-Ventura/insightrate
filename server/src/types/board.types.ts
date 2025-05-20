export interface Board {
  id?: string;
  name: string;
  slug?: string;
  description: string;
  private: boolean;
  ownerId: string;
  createdAt?: Date;
}