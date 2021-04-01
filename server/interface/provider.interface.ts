export interface ProviderAddModel{
    id?: number;        
    name: string;
    lastName?: string;
    email: string;
    phone: string;    
    city: string;
    state: string;
    country: string;
    // articles: string[];
    createdAt?: Date;
    updatedAt?: Date;
}