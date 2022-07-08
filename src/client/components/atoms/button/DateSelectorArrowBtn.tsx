import { Merge } from '@shared/types/common';
import { Direction } from '@shared/enums/common';
import React, { ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface Props {
  direction?: Direction;
  onClick?: (direction: Direction) => void;
}

type BtnProps = Merge<
  Props,
  {
    onClick?: (evt: SyntheticEvent) => void;
  }
>;

const DateSelectorArrowBtn = ({
  direction = Direction.LEFT,
  onClick,
}: Props): ReactElement => {
  const handleBtnClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    onClick?.(direction);
  };

  return (
    <Btn
      className="btn-date-selector-arrow"
      direction={direction}
      onClick={handleBtnClick}
    >
      <svg
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3335 1.6665L2.00016 14.999L15.3335 28.3332"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </Btn>
  );
};

export default DateSelectorArrowBtn;

const Btn = styled.button<BtnProps>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin-top: 4px;
  width: 30px;
  height: 34px;
  line-height: 34px;
  background-color: transparent;
  border: none;
  overflow: hidden;
  cursor: pointer;

  ${(props) =>
    props.direction === Direction.RIGHT &&
    `
    transform: scaleX(-1);
  `}
`;
