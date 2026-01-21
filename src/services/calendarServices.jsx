import api from "./apiService";

export const getCalendars = async () => {
  const result = await api.read({route: "calendars"});
  return  result.map(prod => ({...prod,
  date: prod?.date?.length ? new Date(prod.date) : null}));

};

export const saveCalendar = async (calendarData) => {
  if(calendarData.id){
    await api.put({body: calendarData, route: "calendars", params: [calendarData.id]})
  } else {
    await api.post("calendars", calendarData)
  }
  return await getCalendars();
};

export const deleteCalendar = async (calendarId) => {
  await api.delete("calendars", calendarId);
  //DELETE FROM ALL PRODUCTS
  return await getCalendars();
 };