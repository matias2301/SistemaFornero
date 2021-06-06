export interface Repair{
    id?: number;
    ClientId: number;        
    description: string;
    state: string;    
    takenId: number;
    assignedId: number;
    estDate: Date;
    // articles: string[];
    observations: string[];    
}