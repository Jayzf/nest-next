import { CalendarMonthGroup } from '../enums/calendar';

export interface BaseDate {
  year: number;
  month: number;
  date: number;
  day: number;
}

export interface CalendarDateData extends BaseDate {
  CalendarMonthGroup: CalendarMonthGroup;
  isDateOfCurrentMonth: boolean;
}

export interface ScheduleData {
  id: string;
  title: string;
  start: BaseDate & {
    hour?: number;
    minute?: number;
  };
  end: BaseDate & {
    hour?: number;
    minute?: number;
  };
}
