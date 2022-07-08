import { ScheduleModalDataType } from '@client/components/organisms/modal/ScheduleModal/ScheduleModal';
import { NUM_DISPLAY_WEEKS_IN_MONTH } from '@client/constants/calendar';
import { NUM_DAYS_IN_WEEK } from '@client/constants/date';
import { CalendarMonthGroup } from '@shared/enums/calendar';
import {
  BaseDate,
  CalendarDateData,
  ScheduleData,
} from '@shared/types/calendar';
import { decimalInt, each, isEmpty } from '@shared/utils/common';
import { getDateInfo } from '@shared/utils/date';
import { isAfter, isBefore } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { generateDate } from './date';

export const checkValidSchedule = (
  data: ScheduleModalDataType,
): ScheduleData => {
  const { title, startDate, startTime, endDate, endTime } = data;

  if (isEmpty(title)) {
    window.alert('일정 제목을 입력하세요.');
    return;
  }

  const startDatas = startDate.split('-');
  if (startDatas.length !== 3) {
    window.alert('시작 날짜, 시작 시간을 정확히 입력하세요.');
    return;
  }

  const endDatas = endDate.split('-');
  if (endDatas.length !== 3) {
    window.alert('종료 날짜, 종료 시간을 정확히 입력하세요.');
    return;
  }

  // TODO: 종료 날짜, 종료 시간이 시작 날짜, 시작 시간보다 앞설 경우, submit 불가 및 alert 처리
  // TODO: 모든 input 입력이 완료되지 않았을 경우, submit 불가 및 alert 처리
  /*
    const startDatas = startDate.split('-').concat(startTime.split(':'));
    if (startDatas.length !== 5) {
      window.alert('시작 날짜, 시작 시간을 정확히 입력하세요.');
      return;
    }
  
    const endDatas = endDate.split('-').concat(endTime.split(':'));
    if (endDatas.length !== 5) {
      window.alert('종료 날짜, 종료 시간을 정확히 입력하세요.');
      return;
    }
    */

  return {
    id: uuidv4(),
    title,
    start: {
      year: decimalInt(startDatas[0]),
      month: decimalInt(startDatas[1]),
      date: decimalInt(startDatas[2]),
      day: new Date(startDate).getDay(),
      // hour: decimalInt(startDatas[3]),
      // minute: decimalInt(startDatas[4]),
    },
    end: {
      year: decimalInt(endDatas[0]),
      month: decimalInt(endDatas[1]),
      date: decimalInt(endDatas[2]),
      day: new Date(endDate).getDay(),
      // hour: decimalInt(endDatas[3]),
      // minute: decimalInt(endDatas[4]),
    },
  };
};

export const getDatesToRender = (
  _date: Date,
): {
  dates: CalendarDateData[];
  firstDate: CalendarDateData;
  lastDate: CalendarDateData;
} => {
  const {
    lastMonth,
    currentMonth,
    nextMonth,
    lastMonthLastDate,
    currentMonthFirstDate,
    currentMonthLastDate,
    nextMonthFirstDate,
  } = getDateInfo(_date);

  const dates: CalendarDateData[] = [];

  // last month dates
  let year: number, month: number, date: number, day: number;
  for (let i = 1, max = currentMonthFirstDate.getDay(); i <= max; i++) {
    year = lastMonthLastDate.getFullYear();
    month = lastMonth;
    date = lastMonthLastDate.getDate() - currentMonthFirstDate.getDay() + i;
    day = new Date(`${year}-${month}-${date}`).getDay();

    dates.push({
      CalendarMonthGroup: CalendarMonthGroup.LAST,
      year,
      month,
      date,
      day,
      isDateOfCurrentMonth: false,
    });
  }

  // current month dates
  for (let i = 1, max = currentMonthLastDate.getDate(); i <= max; i++) {
    year = currentMonthFirstDate.getFullYear();
    month = currentMonth;
    date = i;
    day = new Date(`${year}-${month}-${date}`).getDay();

    dates.push({
      CalendarMonthGroup: CalendarMonthGroup.CURRENT,
      year,
      month,
      date,
      day,
      isDateOfCurrentMonth: true,
    });
  }

  // next month dates
  const nextMonthDateNumToDisplay =
    NUM_DAYS_IN_WEEK * NUM_DISPLAY_WEEKS_IN_MONTH - dates.length; // default: NUM_DAYS_IN_WEEK - (days.length % NUM_DAYS_IN_WEEK);
  for (let i = 1; i <= nextMonthDateNumToDisplay; i++) {
    year = nextMonthFirstDate.getFullYear();
    month = nextMonth;
    date = i;
    day = new Date(`${year}-${month}-${date}`).getDay();

    dates.push({
      CalendarMonthGroup: CalendarMonthGroup.NEXT,
      year,
      month,
      date,
      day,
      isDateOfCurrentMonth: false,
    });
  }

  return {
    dates,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
  };
};

export const getDayTitleColor = (dayShortEng: string): string => {
  if (dayShortEng === 'Sun') return '#EB5757';
  if (dayShortEng === 'Sat') return '#2F80ED';
  return '#828282';
};

export function getDefaultPresenterDictionary(dates: CalendarDateData[]): any {
  const dic = {};
  each(dates, (d: CalendarDateData): void => {
    // dic[`${d.year}-${d.month}-${d.date}`] = { assignedScheduleNum: 0 };
    dic[`${d.year}-${d.month}-${d.date}`] = [];
  });

  return dic;
}

export function getRenderStartDate(
  start: BaseDate,
  firstDate: CalendarDateData,
) {
  return isBefore(generateDate(start), generateDate(firstDate))
    ? firstDate
    : start;
}

export function getRenderEndDate(end: BaseDate, lastDate: CalendarDateData) {
  return isAfter(generateDate(end), generateDate(lastDate)) ? lastDate : end;
}
