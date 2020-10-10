import React from 'react';
import ReactDOM from 'react-dom';
import './ShadowBox.css';

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.querySelector('#shadowbox'));
};

export default props => {
  return (
    <Portal>
      <div className="shadowbox">
        <div className="shadowbox__shadow" onClick={props.close} />
        <div className="shadowbox__box">
          <button className="shadowbox__close" onClick={props.close}>
            Close
          </button>
          <div className="shadowbox__content">{props.children}</div>
        </div>
      </div>
    </Portal>
  );
};
