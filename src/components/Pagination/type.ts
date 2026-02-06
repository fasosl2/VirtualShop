import type { Dispatch, SetStateAction } from "react";

export interface IPagination {
  page: number;
  pages?: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  itemsArray: any[];
}