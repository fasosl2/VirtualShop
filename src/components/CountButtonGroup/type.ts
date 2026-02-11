export interface ICountButtonGroup {
  total?: number;
  onClick: (args: {
    element: any;
    negativeValue: number | null;
    setItemsLoading: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
    field: string;
  }) => void;
  element: any;
  contentlabel: string;
  emptyLabel?: string;
};