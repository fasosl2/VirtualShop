import type { IProduct } from "./Product";
import type { IUser } from "./User";
import type { IPurchase } from "./Purchase";
import type { ICategory } from "./Category";
import type { Item } from "./Item";
import type { IChart } from "./Chart";
import type { Dispatch } from "react";

//import { AboutPage } from "./pages/About";

export interface AppState {
  activeProduct: IProduct | null;
  activeUser: IUser | null;
  activeCalendar: any | null; // No interface for Calendar
  isLoading: number;
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

/**
 * Interface que define o valor que o Contexto entrega para a aplicação
 */
export interface ContextProps {
  state: AppState;
  dispatch: Dispatch<IAction>;
}
