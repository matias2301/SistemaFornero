export interface newUser{
    id?: number;        
    name: string;
    email: string;
    password: string;
    role: string;
    state: string
    createdAt?: Date;
    updatedAt?: Date;
}