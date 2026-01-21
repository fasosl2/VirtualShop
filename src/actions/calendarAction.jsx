import {
  deleteCalendar,
  getCalendars,
  saveCalendar,
  } from "../services/calendarServices";
import utilService from "../services/utilService";

import {
  deleteCalendarsInitType,
  deleteCalendarsSuccessType,
  fetchCalendarsInitType,
  fetchCalendarsSuccessType,
  saveCalendarsInitType,
  saveCalendarsSuccessType,
} from "../storage/types";

export const fetchCalendarsInitAction = () => ({
  type: fetchCalendarsInitType,
});

export const fetchCalendarsSuccessAction = (calendars) => ({
  type: fetchCalendarsSuccessType,
  payload: calendars,
});

export const fetchCalendarsAction = async (dispatch) => {
  dispatch(fetchCalendarsInitAction());
  const calendars = await getCalendars();
  dispatch(fetchCalendarsSuccessAction(calendars));
};

export const saveCalendarsInitAction = () => ({
  type: saveCalendarsInitType,
});

export const saveCalendarsSuccessAction = (calendars) => ({
  type: saveCalendarsSuccessType,
  payload: calendars,
});

export const saveCalendarsAction = async (dispatch, calendarData) => {
  dispatch(saveCalendarsInitAction());
  await utilService.sleep(1000);
  const newCalendar = await saveCalendar(calendarData);
  dispatch(saveCalendarsSuccessAction(newCalendar));
};

export const deleteCalendarInitAction = () => ({
  type: deleteCalendarsInitType,
});

export const deleteCalendarSuccessAction = (calendars) => ({
  type: deleteCalendarsSuccessType,
  payload: calendars,
});

export const deleteCalendarAction = async (dispatch, calendar) => {
  dispatch(deleteCalendarInitAction());
  await utilService.sleep(1000);
  const calendars = await deleteCalendar(calendar);
  dispatch(deleteCalendarSuccessAction(calendars));
};
