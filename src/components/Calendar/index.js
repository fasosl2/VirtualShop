import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt)


export const Calendar = ({startDate, setStartDate}) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      inline
      showTimeSelect
      locale="pt"
    />
  );
};