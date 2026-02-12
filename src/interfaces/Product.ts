
import type { ICategory } from "./Category";
import type { IItem } from "./Item";

export interface IProduct {
    id?: string;
    _id: string;
    items?: IItem[];
    title: string;
    shortTitle?: string;
    description?: string;
    price?: number;
    stock: string;
    image: string | File;
    categories: ICategory[];
    variant: {
      isBase: "Não" | "Sim";
      baseID: string;
    }
    [key: string]: any;
}

