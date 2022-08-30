export interface RepairAddModel{
    id?: number;        
    description: string;
    state: string;
    estDate?: Date;
    budget?: string;
    paidNumber?: string;
    paidState: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}