export interface ArticleAddModel {
  id?: number;
  code: string;        
  description: string;
  price: number;
  stock: number;    
  createdAt?: Date;
  updatedAt?: Date;
}