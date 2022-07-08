import TodayBtn from '@client/components/atoms/button/TodayBtn';
import Portal from '@client/components/atoms/portal/Portal';
import DateSelector from '@client/components/molecules/DateSelector/DateSelector';
import DateUnitSelector from '@client/components/molecules/DateUnitSelector/DateUnitSelector';
import Calendar from '@client/components/organisms/calendar/Calendar';
import ScheduleModal, {
  ScheduleModalDataType,
} from '@client/components/organisms/modal/ScheduleModal/ScheduleModal';
import { DATE_ITEM_WIDTH } from '@client/constants/calendar';
import {
  APPEND_SCHEDULE,
  CLOSE_SCHEDULE_MODAL,
  SET_CALENDAR_DATE,
} from '@client/store/actions/actionTypes';
import { GlobalContext } from '@client/store/context';
import { reducer } from '@client/store/reducer';
import { DateStore, initialState } from '@client/store/store';
import { checkValidSchedule } from '@client/utils/calendar';
import { getAddedMonthDateInfo } from '@client/utils/date';
import { CalendarMode, DateUnit } from '@shared/enums/calendar';
import { Direction } from '@shared/enums/common';
import { ScheduleData } from '@shared/types/calendar';
import { getDateInfo } from '@shared/utils/date';
import { NextPage } from 'next';
import React, { ReactElement, useEffect, useReducer } from 'react';
import styled from 'styled-components';

const Index: NextPage = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { modal } = state;

  useEffect(() => {
    if (modal.schedule.isActive === true) {
      // TODO: set body overflow: hidden;
    } else {
      // TODO: unset body overflow: hidden;
    }
  }, [modal.schedule.isActive]);

  const handleTodayBtnClick = (): void => {
    const { year, month, date } = getDateInfo();
    dispatch({
      type: SET_CALENDAR_DATE,
      year,
      month,
      date,
    });
  };

  const handleDateSelectorArrowClick = (direction: Direction): void => {
    const isClickLeft: boolean = direction === Direction.LEFT;
    if (state.calendar.mode === CalendarMode.MONTHLY) {
      const { year, month, date }: DateStore = getAddedMonthDateInfo(
        state.date.year,
        state.date.month,
        isClickLeft ? -1 : 1,
      );

      dispatch({
        type: SET_CALENDAR_DATE,
        year,
        month,
        date,
      });
    } else {
      // TODO: weekly
      window.alert('TODO: weekly');
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        globalState: state,
        dispatch,
      }}
    >
      <Wrap className="container">
        <CalendarWrap className="wrap-calendar">
          <HeaderWrap className="header">
            <TodayBtn
              style={{
                marginTop: 2,
              }}
              onClick={handleTodayBtnClick}
            />
            <DateSelector
              title={getDateTitle(state.date)}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              onLeftArrowClick={handleDateSelectorArrowClick}
              onRightArrowClick={handleDateSelectorArrowClick}
            />
            <DateUnitSelector
              selectedUnit={DateUnit.MONTH}
              style={{
                margin: '2px 3px 0 auto',
              }}
            />
          </HeaderWrap>

          <Calendar />
        </CalendarWrap>

        {modal.schedule.isActive && (
          <Portal containerSelector="#portal-container">
            <ScheduleModal
              formMode={modal.schedule.formMode}
              onSubmit={(scheduleData: ScheduleModalDataType): void => {
                const data: ScheduleData = checkValidSchedule(scheduleData);
                if (!data) return;

                dispatch({
                  type: APPEND_SCHEDULE,
                  data,
                });

                dispatch({ type: CLOSE_SCHEDULE_MODAL });
              }}
            />
          </Portal>
        )}
      </Wrap>

      <PortalContainer id="portal-container"></PortalContainer>
    </GlobalContext.Provider>
  );
};

export default Index;

const getDateTitle = (date: DateStore): string =>
  `${date.year}년 ${date.month}월`;

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

const CalendarWrap = styled.section`
  position: relative;
  margin: 0 auto;
  padding: 112px 0 100px;
  width: calc(${DATE_ITEM_WIDTH}px * 7);
  background-color: #fff;
`;

const HeaderWrap = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  height: 137px;
`;

const PortalContainer = styled.div``;
