export interface IInputTime {
  inputDate: Date | string | null;
  setInputDate: (value: Date | string | null) => void;
  [key: string]: any;
}