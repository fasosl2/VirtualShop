import type { IProduct } from "./Product";

export interface IChartProduct extends IProduct{
  count?: number;
  price?: number;
  [key: string]: any;
}

export interface IChart {
  id?: string | number;
  products: IChartProduct[];
}