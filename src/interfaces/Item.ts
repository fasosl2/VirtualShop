export interface IItem {
  _id?: string;
  title: string;
  [key: string]: any;
}

export interface SelectedItem extends IItem {
  total: number;
}