import type { IChartProduct } from "../../interfaces/Chart";

// A bit generic to avoid circular dependency, but adds some type safety.
export type ItemOnClick = (args: {
  element: any;
  negativeValue: number;
  setItemsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  field: string;
}) => Promise<void> | void;

export interface IChartList {
  items?: IChartProduct[];
  compact?: boolean;
}