export interface Item {
  id?: string;
  _id?: string;
  title: string;
  [key: string]: any;
}

export interface SelectedItem {
  id: string;
  title: string;
  total: number;
}