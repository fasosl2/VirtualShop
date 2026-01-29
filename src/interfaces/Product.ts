
export interface IProduct {
    id: string;
    _id: string;
    items: string | any[];
    endDate: Date | string | null;
    startDate: Date | string | null;
    count?: number;
    [key: string]: any;
}