export interface RepairAddModel{
    id?: number;        
    description: string;
    state: string;    
    // taken: string;
    // assigned: string;
    estDate?: Date;
    // articles: string[];
    // observations: string[];
    createdAt?: Date;
    updatedAt?: Date;
}