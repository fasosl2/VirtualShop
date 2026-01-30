import type { IProduct } from "./Product";
import type { IUser } from "./User";
import type { IPurchase } from "./Purchase";
import type { ICategory } from "./Category";
import type { Item } from "./Item";
import type { IChart } from "./Chart";
//import { AboutPage } from "./pages/About";

export interface AppState {
  activeProduct: IProduct | null;
  activeUser: IUser | null;
  activeCalendar: any | null; // No interface for Calendar
  isLoading: boolean;
  purchases: IPurchase[];
  mode: string | null;
  chart: IChart;
  type: string | null;
  products: IProduct[];
  users: IUser[];
  calendars: any[]; // No interface for Calendar
  categories: ICategory[];
  items: Item[];
  currentUser: IUser | null;
  selectedItems?: Item[];
}


export interface IAction extends Omit<Partial<AppState>, "type"> {
  type: string | null;
  [key: string]: any;
}