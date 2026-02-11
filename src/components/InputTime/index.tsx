import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
import type { IInputTime } from "./type";
registerLocale('pt', pt)


export const InputTime = ({inputDate, setInputDate, ...props}: IInputTime) => {

  return (
    <DatePicker
      selected={inputDate}
      onChange={(date) => setInputDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="Hora"
      dateFormat="h:mm aa"
      locale="pt"
      {...props}
    />
  );
};