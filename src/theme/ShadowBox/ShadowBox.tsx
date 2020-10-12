import React from 'react';
import ReactDOM from 'react-dom';
import './ShadowBox.css';

const Portal = ({ children }: { children?: React.ReactNode }) => {
  return ReactDOM.createPortal(children, document.querySelector('#shadowbox'));
};

// todo: fly-in, fly-out

export default ({
  children,
  close,
}: {
  children?: React.ReactNode | React.ReactNode[];
  close: React.MouseEvent<HTMLElement>;
}) => (
  <Portal>
    <div className="shadowbox">
      <div className="shadowbox__shadow" onClick={close} />
      <div className="shadowbox__box">
        <button className="shadowbox__close" onClick={close}>
          Close
        </button>
        <div className="shadowbox__content">{children}</div>
      </div>
    </div>
  </Portal>
);
