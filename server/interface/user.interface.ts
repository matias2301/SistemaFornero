export interface UserAddModel {
  id?: number;        
  name: string;
  email: string;
  password: string;
  role: string;
  state: string
  createdAt?: Date;
  updatedAt?: Date;
}