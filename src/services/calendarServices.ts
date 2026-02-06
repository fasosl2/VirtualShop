import api from "./apiService";

export interface ICalendar {
  id?: string;
  _id?: string;
  date: Date | string | null;
  [key: string]: any;
}

export const getCalendars = async (): Promise<ICalendar[]> => {
  const result: any = await api.read({route: "calendars"});
  return  result.map((calendar: ICalendar) => ({...calendar,
  date: calendar?.date ? new Date(calendar.date as string) : null}));

};

export const saveCalendar = async (calendarData: ICalendar): Promise<ICalendar[]> => {
  if(calendarData._id){
    await api.put({body: calendarData, route: "calendars", params: [calendarData._id]})
  } else {
    await api.post("calendars", calendarData)
  }
  return await getCalendars();
};

export const deleteCalendar = async (calendarId: string): Promise<ICalendar[]> => {
  await api.delete("calendars", calendarId);
  //DELETE FROM ALL PRODUCTS
  return await getCalendars();
 };
