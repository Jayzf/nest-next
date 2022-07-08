import React, { CSSProperties, ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';

export interface Props {
  style?: CSSProperties;
  onClick?: (evt: SyntheticEvent) => void;
}

const TodayBtn = ({ style, onClick }: Props): ReactElement => {
  return (
    <Btn className="btn-today" onClick={onClick} style={style}>
      오늘
    </Btn>
  );
};

export default TodayBtn;

const Btn = styled.button<Props>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 10px 24px;
  height: 40px;
  border: 1px solid #d2d2d2;
  border-radius: 40px;
  background-color: #fff;
  font-size: 16px;
  color: #000;
  cursor: pointer;

  &:hover {
    color: #2f80ed;
  }
  &:active {
    color: #fff;
    background-color: #0078ff;
  }
`;
