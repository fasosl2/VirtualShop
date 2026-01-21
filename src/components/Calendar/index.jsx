import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt)


export const Calendar = ({selectedDate, setSelectedDate, ...props}) => {
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