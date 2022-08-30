export interface Repair{
    id?: number;
    ClientId: number;        
    description: string;
    state: string;    
    takenId: number;
    assignedId: number;
    estDate: Date;
    budget: string;
    paidNumber: string;
    paidState: boolean;
    articles: string[];
    observations: string[];    
}