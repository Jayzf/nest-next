import DateUnitBtn from '@client/components/atoms/button/DateUnitBtn';
import { DateUnit } from '@shared/enums/calendar';
import { CSSProperties, ReactElement, useState } from 'react';
import styled from 'styled-components';

interface Props {
  selectedUnit: DateUnit;
  style?: CSSProperties;
}

const DateUnitSelector = ({
  selectedUnit = DateUnit.MONTH,
  style,
}: Props): ReactElement => {
  const [unit, setUnit] = useState<DateUnit>(selectedUnit);

  const handleDateUnitBtnClick = (unit: DateUnit): void => {
    if (unit === DateUnit.WEEK) {
      // TODO:
      window.alert('TODO: weekly');
      return;
    }

    setUnit(unit);
  };

  return (
    <Wrap className="date-unit-selector" style={style}>
      <DateUnitBtn
        selected={unit === DateUnit.MONTH}
        unit={DateUnit.MONTH}
        onClick={handleDateUnitBtnClick}
      />
      <DateUnitBtn
        selected={unit === DateUnit.WEEK}
        unit={DateUnit.WEEK}
        onClick={handleDateUnitBtnClick}
      />
    </Wrap>
  );
};

export default DateUnitSelector;

const Wrap = styled.div`
  min-width: 140px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  overflow: hidden;
`;
