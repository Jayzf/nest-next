import React, { ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';

export interface Props {
  onClick?: (evt: SyntheticEvent) => void;
}

const ScheduleModalCloseBtn = ({ onClick }: Props): ReactElement => {
  const handleBtnClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    onClick?.(evt);
  };

  return (
    <Btn onClick={handleBtnClick}>
      <SvgWrap>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.41692 1.41668L20.5834 20.5831M20.5832 1.4165L1.41675 20.5829"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </SvgWrap>
    </Btn>
  );
};

export default ScheduleModalCloseBtn;

const Btn = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  display: block;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  line-height: 20px;
  background-color: transparent;
  border: none;
  overflow: hidden;
  cursor: pointer;
`;

const SvgWrap = styled.span`
  display: block;
  margin-left: -5px;
`;
