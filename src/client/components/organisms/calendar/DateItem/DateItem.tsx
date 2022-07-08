import DateNo from '@client/components/atoms/date/DateNo';
import { DATE_ITEM_WIDTH } from '@client/constants/calendar';
import { CalendarMonthGroup } from '@shared/enums/calendar';
import { CalendarDateData } from '@shared/types/calendar';
import { CSSProperties, ReactElement, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  style?: CSSProperties;
  data?: CalendarDateData;
  onClick?: (data: CalendarDateData) => void;
}

const DateItem = ({ style, data, onClick }: Props): ReactElement => {
  const handleListItemClick = (): void => {
    onClick?.(data);
  };

  return (
    <Wrap
      className={`date-item`}
      style={style}
      onClick={handleListItemClick}
      data-date={`${data.year}-${data.month}-${data.date}`}
      // data-date={`${data.year}-${data.month}-${data.date}-${data.day}`}
    >
      <DateNo
        style={{
          marginLeft: 10,
        }}
        title={data.date}
        isActive={checkIsToday(data)}
        isDateOfCurrentMonth={data.isDateOfCurrentMonth}
      />
      <DateItemPresenter className="presenter"></DateItemPresenter>
    </Wrap>
  );
};

export default DateItem;

const checkIsToday = (obj: CalendarDateData): boolean => {
  const today: Date = new Date();
  return (
    obj.CalendarMonthGroup === CalendarMonthGroup.CURRENT &&
    obj.year == today.getFullYear() &&
    obj.month === today.getMonth() + 1 &&
    obj.date === today.getDate()
  );
};

const Wrap = styled.li`
  box-sizing: border-box;
  display: block;
  padding: 14px 0 0 0px;
  width: ${DATE_ITEM_WIDTH}px;
  min-height: 138px;
  border-left: 1px solid #d2d2d2;

  :first-child {
    border-left: none;
  }
`;

const DateItemPresenter = styled.div`
  position: relative;
`;
