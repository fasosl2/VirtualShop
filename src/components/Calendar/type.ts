import { ReactDatePickerProps } from "react-datepicker";

export interface CalendarProps extends Omit<ReactDatePickerProps, 'onChange' | 'selected'> {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}