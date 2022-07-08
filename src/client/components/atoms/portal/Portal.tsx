import { ReactNode, ReactPortal } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  containerSelector: string;
  children: ReactNode;
}

const Portal = ({ containerSelector, children }: Props): ReactPortal => {
  if (typeof window === 'undefined') return null;

  const container = document.querySelector(containerSelector);
  return ReactDOM.createPortal(children, container);
};

export default Portal;
