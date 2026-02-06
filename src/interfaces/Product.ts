
import type { ICategory } from "./Category";
import type { Item } from "./Item";

export interface IProduct {
    id?: string;
    _id: string;
    items?: string | Item[];
    title: string;
    shortTitle?: string;
    description?: string;
    price?: number;
    stock: string;
    image: string;
    categories: ICategory[];
    variant: {
      isBase: "Não" | "Sim";
      baseID: string;
    }
    [key: string]: any;
}

