import React from "react";
import utilService from "../services/utilService";
import type { IAction } from "../interfaces/Context";
import {
  deleteCalendar,
  getCalendars,
  saveCalendar
  } from "../services/calendarServices";

import {
  deleteCalendarsInitType,
  deleteCalendarsSuccessType,
  fetchCalendarsInitType,
  fetchCalendarsSuccessType,
  saveCalendarsInitType,
  saveCalendarsSuccessType,
} from "../storage/actionConstants";
import type { ICalendar } from "../interfaces/Calendar";


export const fetchCalendarsInitAction = () => ({
  type: fetchCalendarsInitType,
});

export const fetchCalendarsSuccessAction = (calendars: ICalendar[]) => ({
  type: fetchCalendarsSuccessType,
  payload: calendars,
});

export const fetchCalendarsAction = async (dispatch: React.Dispatch<IAction>) => {
  dispatch(fetchCalendarsInitAction());
  const calendars = await getCalendars();
  dispatch(fetchCalendarsSuccessAction(calendars));
};

export const saveCalendarsInitAction = () => ({
  type: saveCalendarsInitType,
});

export const saveCalendarsSuccessAction = (calendars: ICalendar[]) => ({
  type: saveCalendarsSuccessType,
  payload: calendars,
});

export const saveCalendarsAction = async (dispatch: React.Dispatch<IAction>, calendarData: ICalendar) => {
  dispatch(saveCalendarsInitAction());
  await utilService.sleep(1000);
  const newCalendar = await saveCalendar(calendarData);
  dispatch(saveCalendarsSuccessAction(newCalendar));
};

export const deleteCalendarInitAction = () => ({
  type: deleteCalendarsInitType,
});

export const deleteCalendarSuccessAction = (calendars: ICalendar[]) => ({
  type: deleteCalendarsSuccessType,
  payload: calendars,
});

export const deleteCalendarAction = async (dispatch: React.Dispatch<IAction>, calendarId: string) => {
  dispatch(deleteCalendarInitAction());
  await utilService.sleep(1000);
  const calendars = await deleteCalendar(calendarId);
  dispatch(deleteCalendarSuccessAction(calendars));
};
