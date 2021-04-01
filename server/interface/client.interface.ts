export interface ClientAddModel{
    id?: number;        
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetName: string;
    streetNumber: string;
    city: string;
    state: string;
    country: string;    
    createdAt?: Date;
    updatedAt?: Date;
}