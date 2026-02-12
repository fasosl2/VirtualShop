import type { IProduct } from "./Product";
import type { IUser } from "./User";
import type { IPurchase } from "./Purchase";
import type { ICategory } from "./Category";
import type { IItem } from "./Item";
import type { IChart } from "./Chart";
import type { Dispatch } from "react";
import type { ICalendar } from "./Calendar";
import type { IPaginatedResponse } from "./Response";

//import { AboutPage } from "./pages/About";

export interface AppState {
  activeProduct: IProduct | null;
  activeUser: IUser | null;
  activeCalendar: ICalendar | null;
  activeItem: IItem | null;
  activePurchase: IPurchase | null;
  isLoading: number;
  purchases: IPurchase[];
  mode: string | null;
  chart: IChart;
  type: string | null;
  products: IPaginatedResponse<IProduct>;
  users: IPaginatedResponse<IUser>;
  calendars: ICalendar[];
  categories: IPaginatedResponse<ICategory>;
  items: IItem[];
  currentUser: IUser | null;
  selectedItems?: IItem[];
}


export interface IAction extends Omit<Partial<AppState>, "type"> {
  type: string | null;
  payload?: any;
  [key: string]: any;
}

/**
 * Interface que define o valor que o Contexto entrega para a aplicação
 */
export interface ContextProps {
  state: AppState;
  dispatch: Dispatch<IAction>;
}
