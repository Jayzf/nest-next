import React, { CSSProperties, FC, ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface Props {
  style?: CSSProperties;
  color?: string;
  opacity?: number;
  onClick?: (evt: SyntheticEvent) => void;
}

const Overlay: FC<Props> = (props: Props): ReactElement => {
  const { style, color = '#000', opacity = 0.5, onClick } = props;

  return (
    <Wrap
      className="overlay"
      style={style}
      color={color}
      opacity={opacity}
      onClick={onClick}
    ></Wrap>
  );
};

export default Overlay;

const Wrap = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
`;
