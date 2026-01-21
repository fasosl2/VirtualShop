import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt)


export const InputTime = ({startDate, setStartDate, ...props}) => {

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
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