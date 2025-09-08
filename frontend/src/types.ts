export interface MonthlySale {
    _id: { year: number; month: number };
    totalQuantity: number;
    year: number;
    month: number;
}

export interface ProductSale {
    _id: string;
    totalQuantity: number;
}