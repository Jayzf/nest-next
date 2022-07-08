import { DateStore } from '@client/store/store';
import { getDateInfo } from '@shared/utils/date';
import { addMonths } from 'date-fns';

export const getAddedMonthDateInfo = (
  year: number,
  month: number,
  addMonthAmount: number,
): DateStore => {
  const currentMonthFirstDate: Date = new Date(year, month - 1, 1);
  const lastMonthDate: Date = addMonths(currentMonthFirstDate, addMonthAmount);
  const date: Partial<DateStore> = getDateInfo(lastMonthDate);

  return {
    year: date.year,
    month: date.month,
    date: date.date,
  };
};

export const generateDate = (obj: {
  year: number;
  month: number;
  date: number;
}): Date => {
  return new Date(obj.year, obj.month - 1, obj.date);
};
