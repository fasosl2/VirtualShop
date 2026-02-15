import type { IChartProduct } from "./Chart";
import type { IUser } from "./User";

export interface IPurchase {
  _id?: string;
  user?: IUser;
  deliveryDate?: Date | null;
  products?: IChartProduct[];
  paymentStatus?: string;
  deliveryStatus?: string;
  paymentMethod?: string;
  discount?: number;
  observations?: string;
  recurrence?: {
    isBase: 'Sim' | 'Não';
    baseID: string;
  };
  address?:{
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    referencePoint?: string;
  }
  [key: string]: any;
}