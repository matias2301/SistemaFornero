export interface Client {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;    
    city: string;
    state?: string;
    country?: string;
}