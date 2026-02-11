export interface Item {
  _id?: string;
  title: string;
  [key: string]: any;
}

export interface SelectedItem {
  _id?: string;
  title: string;
  total: number;
}