import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
import type { CalendarProps } from "./type";
registerLocale('pt', pt);


export const Calendar = ({selectedDate, setSelectedDate, ...props}: CalendarProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      locale="pt"
      dateFormat="dd/MM/yyyy"
      className="form-control"
      {...props}
    />
  );
};
