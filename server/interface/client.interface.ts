export interface ClientAddModel{
    id?: number;        
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    // streetNumber: string;
    city: string;
    state: string;
    country: string;    
    enabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}