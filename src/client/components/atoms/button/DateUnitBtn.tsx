import { DateUnit } from '@shared/enums/calendar';
import { Merge } from '@shared/types/common';
import { isMonth } from '@shared/utils/date';
import React, { ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';

export interface Props {
  selected?: boolean;
  unit?: DateUnit;
  onClick?: (dateUnit: DateUnit) => void;
}

type BtnProps = Merge<
  Props,
  {
    onClick?: (evt: SyntheticEvent) => void;
  }
>;

const DateUnitBtn = ({
  selected = false,
  unit = DateUnit.MONTH,
  onClick,
}: Props): ReactElement => {
  const unitKor: string = isMonth(unit) ? '월' : '주';

  const handleBtnClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    onClick?.(unit);
  };

  return (
    <Btn
      className="btn-date-unit"
      disabled={selected}
      selected={selected}
      unit={unit}
      onClick={handleBtnClick}
    >
      {unitKor}
    </Btn>
  );
};

export default DateUnitBtn;

const Btn = styled.button<BtnProps>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 10px 5px;
  width: 70px;
  height: 40px;
  border: none;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    color: #fff;
    background-color: #000;
    cursor: auto;
  `}
`;
