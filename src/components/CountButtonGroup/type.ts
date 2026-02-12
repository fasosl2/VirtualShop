import type { IProduct } from "../../interfaces/Product";

export interface IChartItemClickParams {
    element: IProduct,
    negativeValue?: number,
    field?: string,
    setItemsLoading?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  }

export interface ICountButtonGroup {
  total?: number;
  onClick: (args: IChartItemClickParams) => void;
  element: any;
  contentLabel?: string;
  emptyLabel?: string;
};