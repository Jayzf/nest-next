import Portal from '@client/components/atoms/portal/Portal';
import {
  DATE_ITEM_WIDTH,
  NUM_DISPLAY_WEEKS_IN_MONTH,
  SCHEDULE_BAR_HEIGHT,
} from '@client/constants/calendar';
import {
  DAY_NAMES,
  DAY_SHORT_NAMES,
  NUM_DAYS_IN_WEEK,
} from '@client/constants/date';
import { OPEN_SCHEDULE_MODAL } from '@client/store/actions/actionTypes';
import { GlobalContext } from '@client/store/context';
import {
  getDatesToRender,
  getDayTitleColor,
  getDefaultPresenterDictionary,
  getRenderEndDate,
  getRenderStartDate,
} from '@client/utils/calendar';
import { generateDate } from '@client/utils/date';
import { ScheduleModalFormMode } from '@shared/enums/schedule';
import { CalendarDateData, ScheduleData } from '@shared/types/calendar';
import { each, map } from '@shared/utils/common';
import { addDays, differenceInDays, isAfter, isBefore } from 'date-fns';
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import DateItem from './DateItem/DateItem';

interface DayTitleItemProps {
  dayShortEng?: string;
}

const Calendar = (): ReactElement => {
  const { globalState, dispatch } = useContext(GlobalContext);

  const calendarDate = useMemo(() => globalState.date, [globalState.date]);
  const { dates, firstDate, lastDate } = useMemo(
    () => getDatesToRender(generateDate(globalState.date)),
    [globalState.date.year, globalState.date.month, globalState.date.date],
  );
  const scheduleDatas = useMemo(
    () => globalState.schedule.datas,
    [globalState.schedule.datas],
  );

  const [schedules, setSchedules] = useState([]);
  const [presenterDictionary, setPresenterDictionary] = useState(
    getDefaultPresenterDictionary(dates),
  );

  useEffect(() => {
    const { datas } = globalState.schedule;
    if (datas.length <= 0) return;

    // condition that schedules exist
    const schedulePortals = [];
    for (let i = 0, max = datas.length; i < max; i++) {
      // const schedule: ScheduleData = datas[i];
      const { id, title = '', start, end }: ScheduleData = datas[i];

      // skip invalid schedules
      const isBeforeSchedule: boolean = isBefore(
        generateDate(end),
        generateDate(firstDate),
      );
      if (isBeforeSchedule) continue;

      const isAfterSchedule: boolean = isAfter(
        generateDate(start),
        generateDate(lastDate),
      );
      if (isAfterSchedule) continue;

      // set schedule limit to render on current month
      const renderStart = getRenderStartDate(start, firstDate);
      const renderEnd = getRenderEndDate(end, lastDate);
      const scheduleDuration =
        differenceInDays(generateDate(renderEnd), generateDate(renderStart)) +
        1;

      // get all schedule presenters
      const accumulatedPresenterDic = drawScheduleLine(
        schedulePortals,
        {
          id,
          title,
          restDatesNum: scheduleDuration,
          startDay: renderStart.day,
          scheduleDataToRender: renderStart,
        },
        Object.assign({}, { ...presenterDictionary }),
      );
      setPresenterDictionary(accumulatedPresenterDic);
    }

    // set portals to draw schedule presenters
    setSchedules(schedulePortals);
  }, [scheduleDatas, calendarDate]);

  function drawScheduleLine(
    portals: any[],
    data: {
      id: string;
      title: string;
      restDatesNum: number;
      startDay: number;
      scheduleDataToRender: {
        year: number;
        month: number;
        date: number;
      };
    },
    accPresenterDic: any,
  ): any {
    // TODO: Refactoring
    const { id, title, startDay, scheduleDataToRender } = data;
    let restDatesNum = data.restDatesNum;
    const initialDate = `${scheduleDataToRender.year}-${scheduleDataToRender.month}-${scheduleDataToRender.date}`;
    const drawableDayNum = 7 - startDay;

    if (drawableDayNum < restDatesNum) {
      const targetDates = [];
      const cloneDic = {};

      const baseDate = generateDate(scheduleDataToRender);
      for (let i = 0, max = drawableDayNum; i < max; i++) {
        const d = addDays(baseDate, i);
        const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        const ids = accPresenterDic[dateStr];
        if (!ids.includes(id)) ids.push(id);

        cloneDic[dateStr] = ids.concat();
        targetDates.push(dateStr);
      }

      const idIndexes = targetDates.map((_d) => cloneDic[_d].indexOf(id));
      const positionNo = Math.max(...idIndexes);
      targetDates.forEach((d) => {
        const presenterIds = accPresenterDic[d].concat();
        const gap = positionNo - presenterIds.length + 1;
        if (gap > 0) {
          const lastPresenterId = presenterIds.pop();
          accPresenterDic[d] = [
            ...presenterIds,
            ...new Array(gap).fill(null),
            lastPresenterId,
          ];
        }
      });

      portals.push(
        <Portal
          key={`${id}-${initialDate}`}
          containerSelector={`li[data-date="${initialDate}"] .presenter`}
        >
          <SchedulePresenterBar
            color={'#EB5757'} // FIXME: 중복되지 않는 random color 생성
            schedulePositionNo={positionNo}
            dateNum={drawableDayNum}
          >
            {title}
          </SchedulePresenterBar>
        </Portal>,
      );

      restDatesNum -= drawableDayNum;

      // get start date of next row
      const nextRowStartDate = addDays(
        generateDate(scheduleDataToRender),
        drawableDayNum,
      );

      // 재귀 호출을 통한 next row 그리기. 남은 일정으로 ${restDatesNum} 길이만큼 일정 그리기
      drawScheduleLine(
        portals,
        {
          id,
          title,
          restDatesNum,
          startDay: 0,
          scheduleDataToRender: {
            year: nextRowStartDate.getFullYear(),
            month: nextRowStartDate.getMonth() + 1,
            date: nextRowStartDate.getDate(),
          },
        },
        accPresenterDic,
      );
    } else {
      const targetDates = [];
      const cloneDic = {};

      const baseDate = generateDate(scheduleDataToRender);
      for (let i = 0, max = restDatesNum; i < max; i++) {
        const d = addDays(baseDate, i);
        const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        const ids = accPresenterDic[dateStr];
        if (!ids.includes(id)) ids.push(id);

        cloneDic[dateStr] = ids.concat();
        targetDates.push(dateStr);
      }

      const idIndexes = targetDates.map((_d) => cloneDic[_d].indexOf(id));
      const positionNo = Math.max(...idIndexes);
      targetDates.forEach((_d) => {
        const presenterIds = accPresenterDic[_d].concat();
        const gap = positionNo - presenterIds.length + 1;
        if (gap > 0) {
          const lastPresenterId = presenterIds.pop();
          accPresenterDic[_d] = [
            ...presenterIds,
            ...new Array(gap).fill(null),
            lastPresenterId,
          ];
        }
      });

      // 마지막 row 내에서 일정 그리기 완료. ${startDay}요일부터 ${restDatesNum} 길이만큼 일정 그리기
      portals.push(
        <Portal
          key={`${id}-${initialDate}`}
          containerSelector={`li[data-date="${initialDate}"] .presenter`}
        >
          <SchedulePresenterBar
            color={'#EB5757'} // FIXME: 중복되지 않는 random color 생성
            schedulePositionNo={positionNo}
            dateNum={restDatesNum}
          >
            {title}
          </SchedulePresenterBar>
        </Portal>,
      );
    }

    return accPresenterDic;
  }

  const renderDateList = (): ReactElement => {
    const items: ReactNode = map(
      DAY_NAMES,
      (name: string, index: number): ReactElement => (
        <DayTitleItem
          key={`day-title-item-${name}`}
          dayShortEng={DAY_SHORT_NAMES[index]}
        >
          {name}
        </DayTitleItem>
      ),
    );

    return <DateList className="top">{items}</DateList>;
  };

  const renderContents = (dates: CalendarDateData[]): ReactNode => {
    let dateCount = 0;

    const dateListRows = [];
    for (let i = 0; i < NUM_DISPLAY_WEEKS_IN_MONTH; i++) {
      const dateItems: ReactElement[] = [];

      for (let j = 0; j < NUM_DAYS_IN_WEEK; j++) {
        const obj = dates[dateCount];
        if (!obj) continue;

        dateItems.push(
          <DateItem
            key={`day-item-${i}-${j}`}
            data={obj}
            onClick={(data: CalendarDateData): void => {
              dispatch({
                type: OPEN_SCHEDULE_MODAL,
                formMode: ScheduleModalFormMode.CREATE,
              });
            }}
          />,
        );

        dateCount++;
      }

      dateListRows.push(<DateList key={`day-list-${i}`}>{dateItems}</DateList>);
    }

    return dateListRows;
  };

  return (
    <Wrap className="calendar">
      <Header>{renderDateList()}</Header>
      <Contents>{renderContents(dates)}</Contents>
      <div>{schedules}</div>
    </Wrap>
  );
};

export default Calendar;

const Wrap = styled.div`
  width: 100%;
`;

const Header = styled.div``;

const Contents = styled.div``;

const DateList = styled.ul`
  box-sizing: border-box;
  display: flex;
  margin: 0;
  padding: 0;
  color: #828282;
  border-top: 1px solid #d2d2d2;

  &.top {
    border-top: none;
  }
`;

const DayTitleItem = styled.li<DayTitleItemProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: ${DATE_ITEM_WIDTH}px;
  height: 60px;
  border-left: 1px solid #d2d2d2;
  font-size: 20px;
  font-weight: 300;
  line-height: 60px;

  ${(props) => `
    color: ${getDayTitleColor(props.dayShortEng)};
  `}}

  :first-child {
    border-left: none;
  }
`;

const SchedulePresenterBar = styled.div<{
  color: string;
  schedulePositionNo?: number;
  dateNum: number;
}>`
  box-sizing: border-box;
  position: absolute;
  display: block;
  top: 0;
  width: 0px;
  height: 32px;
  margin-left: 20px;
  padding: 0 12px;
  border-radius: 4px;
  background-color: #f00;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  line-height: 32px;
  overflow: hidden;

  ${(props) => `
    top: calc(${SCHEDULE_BAR_HEIGHT}px * ${props.schedulePositionNo - 1});
    width: calc(${DATE_ITEM_WIDTH}px * ${props.dateNum} - (20px * 2));
  `}}
`;
