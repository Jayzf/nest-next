import DateSelectorArrowBtn from '@client/components/atoms/button/DateSelectorArrowBtn';
import { Direction } from '@shared/enums/common';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  title: ReactNode;
  onLeftArrowClick?: (direction: Direction) => void;
  onRightArrowClick?: (direction: Direction) => void;
  style?: CSSProperties;
}

const DateSelector = ({
  title = '',
  style,
  onLeftArrowClick,
  onRightArrowClick,
}: Props): ReactElement => {
  return (
    <Wrap className="date-selector" style={style}>
      <DateSelectorArrowBtn onClick={onLeftArrowClick} />
      <DisplayDate>{title}</DisplayDate>
      <DateSelectorArrowBtn
        direction={Direction.RIGHT}
        onClick={onRightArrowClick}
      />
    </Wrap>
  );
};

export default DateSelector;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 306px;
  height: 48px;
`;

const DisplayDate = styled.strong`
  display: inline-block;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #000;
`;
