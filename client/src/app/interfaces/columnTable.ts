export interface ColumnTable {
    name: string;
    dataKey: string;
    position?: 'right' | 'left';
    isSortable?: boolean;
}