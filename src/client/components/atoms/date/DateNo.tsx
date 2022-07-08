import React, { ReactElement } from 'react';
import styled, { CSSProperties } from 'styled-components';

export interface Props {
  style?: CSSProperties;
  title?: number | string;
  isActive?: boolean;
  isDateOfCurrentMonth?: boolean;
}

const DateNo = ({
  style,
  title = 0,
  isActive = false,
  isDateOfCurrentMonth = true,
}: Props): ReactElement => {
  return (
    <Wrap
      style={style}
      className="date-no"
      isActive={isActive}
      isDateOfCurrentMonth={isDateOfCurrentMonth}
    >
      {title}
    </Wrap>
  );
};

export default DateNo;

const Wrap = styled.span<Props>`
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  white-space: nowrap;
  color: #e0e0e0;
  background-color: transparent;

  ${(props) => {
    if (props.isActive === true) {
      return `
        background-color: #0078ff;
        color: #fff;
      `;
    }
    if (props.isDateOfCurrentMonth === true) {
      return `
        color: #828282;
      `;
    }
    return '';
  }}
`;
