import { DateUnit } from '@shared/enums/calendar';
import { BaseDate } from '@shared/types/calendar';
import { getDate, getDay, getMonth, getYear } from 'date-fns';

export const getDateInfo = (
  _date: Date = new Date(),
): BaseDate & {
  lastMonth: number;
  currentMonth: number;
  nextMonth: number;
  lastMonthLastDate: Date;
  currentMonthFirstDate: Date;
  currentMonthLastDate: Date;
  nextMonthFirstDate: Date;
} => {
  const year: number = getYear(_date);
  const month: number = getMonth(_date) + 1;
  const date: number = getDate(_date);
  const day: number = getDay(_date);

  const lastMonthLastDate: Date = new Date(year, month - 1, 0);
  const currentMonthFirstDate: Date = new Date(year, month - 1, 1);
  const currentMonthLastDate: Date = new Date(year, month, 0);
  const nextMonthFirstDate: Date = new Date(year, month, 1);

  const lastMonth: number = lastMonthLastDate.getMonth() + 1;
  const currentMonth: number = currentMonthLastDate.getMonth() + 1;
  const nextMonth: number = nextMonthFirstDate.getMonth() + 1;

  return {
    year,
    month,
    date,
    day,
    lastMonth,
    currentMonth,
    nextMonth,
    lastMonthLastDate,
    currentMonthFirstDate,
    currentMonthLastDate,
    nextMonthFirstDate,
  };
};

export function isMonth(unit: DateUnit): boolean {
  return unit === DateUnit.MONTH;
}
